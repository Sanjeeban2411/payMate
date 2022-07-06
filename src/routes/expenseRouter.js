const express = require('express')
const bcrypt = require('bcryptjs')

// const User = require('../mongo/models/users')
const Room = require('../mongo/models/room')
const Expense = require('../mongo/models/expense')
const auth = require('../middlewares/auth')


const router = new express.Router()

router.post('/addexpense', auth, async(req,res)=>{
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

router.get('/getallexpenses', auth, async(req,res)=>{
    const user = req.user

    const expenses = await Expense.find({owner:user._id})
    // console.log(expenses)
    res.send(expenses)
})

router.post('/:room/addexpenses', auth, async(req, res)=>{
    const room = await Room.findOne({ name: req.params.room })
    const inp = req.body
    if(room){
        const expense = new Expense({
            ...inp,
            owner: req.user._id,
            room: room._id
        })
        await expense.save()
        res.send(expense)
    }
    else{
        res.status(404).send("No room found")
    }
})

router.get('/:room/getexpenses',auth, async(req,res)=>{
    const room = await Room.findOne({ name: req.params.room })
    console.log(room)
    if(room){
        // res.send(room.users)
        const expense = await Expense.find({room:room._id})
        console.log(expense)
        res.send(expense)
    }
    else{
        res.status(404).send("No room found")
    }
})

module.exports = router