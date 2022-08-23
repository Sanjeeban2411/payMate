const mongoose = require('mongoose')
require('../db')

const totalSchema = new mongoose.Schema({
    room:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Room"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    total:{
        type:Number,
        default:0
    }
})

const Total = mongoose.model('Total', totalSchema)

module.exports = Total