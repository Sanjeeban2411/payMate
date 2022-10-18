const express = require('express')
const bcrypt = require('bcryptjs')

// const User = require('../mongo/models/users')
const Room = require('../mongo/models/room')
const Expense = require('../mongo/models/expense')
const Total = require('../mongo/models/total')
const auth = require('../middlewares/auth')


const router = new express.Router()

router.post('/addexpense', auth, async (req, res) => {
    const inp = req.body
    try {
        const expense = new Expense({
            ...inp,
            owner: req.user._id
        })
        await expense.save()
        res.send(expense)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/getexpenses', auth, async (req, res) => {
    try {
        const user = req.user

        const expenses = await Expense.find({ owner: user._id }).populate('room')
        // const owner = await expenses.populate("owner")
        // const users = await room.populate('room')

        // console.log(expenses)
        res.send(expenses)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/deleteexpense/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id)
        if(!expense){
            return res.status(404).send("No expense found")
        }
        if(expense.owner.toString() !== req.user._id.toString()){
            // return res.send({user:req.user._id, owner:expense.owner})
            return res.status(400).send("Not your expense")
        }
        if(!expense.room){
            // await expense.populate("room")
            // return res.send(expense.room)
            // DELETE THE EXPENSE FROM EXPENSE COLLECTION DIRECTLY
            const exp = await Expense.findOneAndDelete({_id:req.params.id})
            // console.log(exp)
            return res.send(exp)
        }

        const tot = await Total.findOne({ $and: [{ room: expense.room }, { user: expense.owner }] })
        tot.total = tot.total - expense.amount
        await tot.save()

        const splitwith = expense.splitInto
        const split = expense.amount / splitwith.length

        for (let i = 0; i < splitwith.length; i++) {
            const due = await Total.findOne({ $and: [{ room: expense.room }, { user: splitwith[i] }] })
            due.dues -= split
            await due.save()
        }

        const exp = await Expense.findOneAndDelete({_id:req.params.id})

        res.send({tot, exp})
    } catch (error) {
        res.status(500).send(error)
    }
})


router.post('/:room/addexpense', auth, async (req, res) => {
    try {
        const room = await Room.findOne({ name: req.params.room })
        console.log("Room", room)
        if (!room) {
            return res.status(404).send("No room found")
        }
        if (!room.users.includes(req.user._id)) {
            return res.status(404).send("Not your room")
        }

        const expense = new Expense({
            purpose: req.body.purpose,
            amount: req.body.amount,
            splitInto: req.body.splitInto,
            owner: req.user._id,
            room: room._id
        })
        await expense.save()

        const tot = await Total.findOne({ $and: [{ room: room._id }, { user: req.user._id }] })
        tot.total = tot.total + req.body.amount
        await tot.save()

        // const split = await Total.updateMany()
        const split = req.body.amount / req.body.splitInto.length
        console.log("split", split)
        for (let i = 0; i < req.body.splitInto.length; i++) {
            const due = await Total.findOne({ $and: [{ room: room._id }, { user: req.body.splitInto[i] }] })
            due.dues += split
            await due.save()
        }

        // console.log(tot.total)
        // console.log(req.body.amount)

        res.send(expense)
    } catch (e) {
        res.status(500).send(e)
    }
})


router.get('/:room/getexpenses', auth, async (req, res) => {
    const room = await Room.findOne({ name: req.params.room })
    // console.log(room)
    if (room) {
        // res.send(room.users)
        const expense = await Expense.find({ room: room._id }).populate('owner')
        console.log(expense)
        // const ofRoom = await expense.populated()
        // console.log(ofRoom)

        // const required = []
        // expense.forEach((val)=>{
        //     const obj = {
        //         amount:val.amount,
        //         purpose:val.purpose,
        //     }
        // })
        const tot = await Total.find({ $and: [{ room: room._id }, { user: req.user._id }] })
        // const tot = await Total.find({user:"62ed3122a5dcd9cd7c29966d"})
        console.log("total", tot)
        res.send(expense)
    }
    else {
        res.status(404).send("No room found")
    }
})

module.exports = router