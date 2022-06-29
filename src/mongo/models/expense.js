const mongoose = require('mongoose')
const validator = require('validator')
require('../db')

const expenseSchema = new mongoose.Schema({
    purpose:{
        type:String,
        required: true,
        trim: true
    },
    amount:{
        type:Number,
        required:true
    },
    owner:{
        type:String,
        required:true,
        ref: "Users"
    }
},{
    timestamps:true
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense