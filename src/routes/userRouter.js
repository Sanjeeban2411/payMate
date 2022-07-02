const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')

const User = require('../mongo/models/users')
// const Expense = require('../mongo/models/expense')
const auth = require('../middlewares/auth')

const router = new express.Router()

router.post('/signup', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.generateAuthToken()
        await user.save()
        res.send({user})
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

router.post('/login', async(req, res)=>{
    const email = req.body.email
    const user =await User.findOne({email})
    if(!user){
        res.status(404).send("Wrong credentials")
        // console.log("not here")
    }
    else{
        // console.log(user)
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(isMatch){
            await user.generateAuthToken()
            console.log(user)
            res.send({user})
        }
        else{
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
    limits:1000000
})

router.post('/addavatar', auth, upload.single('avatar'), async(req, res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.dp = buffer
    // console.log(req.user)
    await req.user.save()
    // res.send(req.user.dp.toString('base64'))
    res.send('Uploaded')
    // res.send(req.file.buffer)
})

router.get('/test', auth, (req,res)=>{
    // res.json({msg:"Hiii"})
    console.log("test api", req.user)
    res.json(req.user)
})

router.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

module.exports = router