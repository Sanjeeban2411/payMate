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
    },
    room:{
        type:String,
        trim:true,
        ref:"Rooms"
    }
},{
    timestamps:true
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense