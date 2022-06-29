const express = require('express')
const bcrypt = require('bcryptjs')

// const User = require('../mongo/models/users')
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

module.exports = router