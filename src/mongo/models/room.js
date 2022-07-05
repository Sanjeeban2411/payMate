const mongoose = require('mongoose')
require('../db')

const roomSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    users:[String]
})

roomSchema.virtual('expense', {
    ref: 'Expense',
    localField: '_id',
    foreignField: 'room'
})

roomSchema.virtual('user', {
    ref: 'Users',
    localField: '_id',
    foreignField: 'room'
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room