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
    users:[{
        user:{
            type:String,
            required:true
        }
    }]
})