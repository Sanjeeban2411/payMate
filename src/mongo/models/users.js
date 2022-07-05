const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('../db')
const Task = require('./expense')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Enter a valid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        // minLength: 6,
    },
    dp: {
        type: Buffer
    },
    token: {
        type: String,
        required: true
    },
    rooms:[String]
})

userSchema.virtual('expense', {
    ref: 'Expense',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('room', {
    ref: 'Room',
    localField: '_id',
    foreignField: 'user'
})

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8)
    next()
})


userSchema.methods.generateAuthToken = async function () {
    // console.log("pehle",this.token)
    if (!this.token) {
        const token = jwt.sign({ _id: this._id.toString() }, "secretcode", { expiresIn: '1h' })
        this.token = token
        return token
    }

    jwt.verify(this.token, "secretcode", (err) => {
        if (err) {
            console.log("expire", err)
            const token = jwt.sign({ _id: this._id.toString() }, "secretcode", { expiresIn: '1h' })
            this.token = token
            return token
        }
    })
    // console.log("baadme",this.token)

}


const User = mongoose.model('User', userSchema)
module.exports = User