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
    const user = req.user

    const expenses = await Expense.find({ owner: user._id })
    // const owner = await expenses.populate("owner")
    // const users = await room.populate('users')


    // console.log(expenses)
    res.send(expenses)
})

router.post('/:room/addexpense', auth, async (req, res) => {
    const room = await Room.findOne({ name: req.params.room })
    const inp = req.body
    // console.log(room)
    try {
        if (room) {
            if (room.users.includes(req.user._id)) {
                const expense = new Expense({
                    ...inp,
                    owner: req.user._id,
                    room: room._id
                })
                await expense.save()

                const tot = await Total.findOne({$and:[{room:room._id}, {user:req.user._id}]})
                if(!tot){
                    const newTot = new Total({
                        room: room._id,
                        user: req.user._id,
                        total: req.body.amount
                    })
                    await newTot.save()
                    return res.send({expense})
                }
                tot.total = Number(tot.total) + Number(inp.amount)
                await tot.save()
                console.log(tot)
                res.send({expense})
            }
            else{
                res.status(404).send("Not your room")
            }
        }
        else {
            res.status(404).send("No room found")
        }
    } catch (error) {
        res.status(500).send(error)
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
        const tot = await Total.find({$and:[{room:req.params.room}, {user:"62ed3122a5dcd9cd7c29966d"}]})
        // const tot = await Total.find({user:"62ed3122a5dcd9cd7c29966d"})
        console.log("total", tot)
        res.send(expense)
    }
    else {
        res.status(404).send("No room found")
    }
})

module.exports = router