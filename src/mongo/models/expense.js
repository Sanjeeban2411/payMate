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
    splitInto:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        // trim:true,
        ref:"Room"
    }
},{
    timestamps:true
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense