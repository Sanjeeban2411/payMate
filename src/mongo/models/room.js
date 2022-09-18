const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('../db')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    users: [{
        // user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        // }
    }]
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

roomSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8)
    next()
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room