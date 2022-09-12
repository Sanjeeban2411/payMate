const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')

const User = require('../mongo/models/users')
const Room = require('../mongo/models/room')
// const Expense = require('../mongo/models/expense')
const auth = require('../middlewares/auth')

const router = new express.Router()

router.post('/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.generateAuthToken()
        await user.save()
        res.send({ user })
    }
    catch (e) {
        console.log(e)
        if(e.code = 11000){
            return res.status(400).send("User already registered")
        }
        res.status(500).send(e)
    }
})

router.post('/login', async (req, res) => {
    const email = req.body.email
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        res.status(404).send("Wrong credentials")
        // console.log("not here")
    }
    else {
        // console.log(user)
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        console.log(isMatch)
        if (!isMatch) {
            await user.generateAuthToken()
            await user.save()
            console.log(user)
            res.send({ user })
        }
        else {
            res.status(404).send("Wrong credentials")
        }
    }
})

const upload = multer({
    // dest:'./pics',
    // fileFilter(req, file, cb){
    //     if(file.toString().endsWith('.png')){
    //         cb(null,true)
    //     }
    //     else{
    //         cb(new Error("Provide valid file"))
    //     }
    // },
    limits: 1000000
})

router.post('/addavatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.dp = buffer
    // console.log(req.user)
    await req.user.save()
    // res.send(req.user.dp.toString('base64'))
    res.send(buffer.toString('base64'))
    // res.send(req.file.buffer)
})

router.get('/showrooms', auth, async (req, res) => {
    try {
        // const user = req.user
        const user = await User.findOne({ _id: req.user._id })
        const rooms = await user.populate("rooms")
        // const rooms = user.rooms
        const roomNames = []
        for (let i =0; i<rooms.rooms.length;i++){
            // res.send(rooms.rooms[i])
            roomNames.push(rooms.rooms[i].name)
        }
        const r = rooms.rooms
        res.send({roomNames, r})
        console.log(roomNames)
        // res.send(user)

    } catch (error) {
        res.send(error)
    }
})

router.get('/user', auth, (req, res) => {
    // res.json({msg:"Hiii"})
    console.log("test api", req.user)
    res.json(req.user)
})

router.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// router.get('/',(req,res)=>{
//     res.send("hello world")
// })

module.exports = router