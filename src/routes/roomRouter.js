const express = require('express')
const bcrypt = require('bcryptjs')

const auth = require('../middlewares/auth')
const User = require('../mongo/models/users')
const Expense = require('../mongo/models/expense')
const Room = require('../mongo/models/room')
const Total = require('../mongo/models/total')


const router = new express.Router()

// CREATE ROOM
router.post('/room/create', auth, async (req, res) => {
    console.log("hi")
    const user = req.user
    try {
        const room = new Room(req.body)
        console.log(user._id)
        room.users.push(user._id)
        await room.save()

        const ourUser = await User.findById(user._id)
        ourUser.rooms.push(room._id)
        await ourUser.save()
        console.log(ourUser)

        const total = new Total({
            room: room._id,
            user: user._id
        })
        await total.save()

        res.send(room)
    } catch (error) {
        res.status(500).send(error)
    }
})

//JOIN ROOM
router.post('/room/join', auth, async (req, res) => {
    console.log('hi', req.user)
    const user = req.user

    try {
        let name
        let password

        name = req.body.name
        password = req.body.password

        const room = await Room.findOne({ name })
        if (!room) {
            res.status(404).send("Room not found")
        }
        else {
            const ourUser = await User.findById(user._id)
            // if (room.password === password) {
            const isMatch = await bcrypt.compare(req.body.password, room.password)
            console.log(isMatch)
            if (!isMatch) {

                if (!room.users.includes(user._id)) {
                    room.users.push(user._id)
                    await room.save()

                    ourUser.rooms.push(room._id)
                    await ourUser.save()

                    const total = new Total({
                        room: room._id,
                        user: user._id,
                        total: 0
                    })
                    await total.save()
                }
                res.send({ room, user })
            }
            else {
                res.status(404).send("Room not found")
            }
        }

    } catch (error) {
        res.status(500).send(error)
    }
})

// GET USERS INSIDE A ROOM
router.get('/:room/users', auth, async (req, res) => {
    // console.log(req.params.room)
    const room = await Room.findOne({ name: req.params.room })
    // console.log("R",room)
    if (room) {
        const users = await room.populate('users')
        console.log("uu",users)
        const userNames = []
        for (let i = 0; i < users.users.length; i++) {
            // res.send(rooms.rooms[i])
            let details = {
                name : users.users[i].name,
                _id : users.users[i]._id,
                token : users.users[i].token
            }
            userNames.push(details)
            // userNames.push(users.users[i].name)
        }
        res.send({ room: room.name, userNames })
        // console.log({ room: room.name, userNames })
    }
    else {
        res.status(404).send("No room found")
    }
})


// GET TOTAL AND DUES FOR REPORT
router.get('/:room/analyze', auth, async (req, res) => {
    const room = await Room.findOne({ name: req.params.room })

    if (!room) {
        return res.status(404).send("Room not found")
    }
    // const expense = await Expense.find({ room: room._id }).populate('owner')
    const expense = await Expense.find({ room: room._id })
    const total = await Total.find({ room: room._id }).populate("room").populate("user")
    console.log(req.user)
    // const user = req.user
    res.send({ expense, total })
})


//SETTLE TRANSACTION / MARK AS DONE (ONLY BY RECIEVER)
router.patch('/:room/settleTransaction', auth, async (req, res) => {
    try {
        const room = await Room.findOne({ name: req.params.room })
        if (!room) {
            return res.status(404).send("Room not found")
        }

        // const total = await Total.find({ room: room._id })

        // if(req.body.command === "settleAllTransactions(aDmin)"){
        //     total.forEach( async(e)=>{
        //         e.total = 0
        //         await e.save()
        //     })
        //     return res.send(total)
        // }

        // const data = {
        //     payer: req.body.payer,
        //     receiver: req.body.receiver,
        //     amount: req.body.amount
        // }

        // console.log("data", data)

        const payer = await Total.findOne({ $and: [{ room: room._id }, { _id: req.body.payer }] })
        const receiver = await Total.findOne({ $and: [{ room: room._id }, { _id: req.body.receiver }] })
        console.log({ "payer": payer, "receiver": receiver })
        payer.total = payer.total + Math.abs(req.body.amount)
        receiver.total = receiver.total - Math.abs(req.body.amount)
        await payer.save()
        await receiver.save()

        const total = await Total.find({ room: room._id })

        console.log("tot", total)
        let avg = 0
        total.forEach((e) => {
            avg += e.total
        })
        avg = avg / total.length

        console.log("avg", avg)

        let count = 0
        total.forEach((e) => {
            // if (Math.round(e.total) === Math.round(avg)) {
                console.log("cede", e.dues)
            if (Math.round(e.total) === Math.round(e.dues)) {
                count += 1
            }
        })
        console.log("cnt", count)
        console.log("len", total.length)

        if (count === total.length) {
            const total = await Total.updateMany({ total: 0, dues:0 })
            // console.log("xxxxx", total)
            return res.send(total)
        }

        res.send({ total, payer, receiver })

    } catch (error) {
        res.status(500).send(error)
    }
})


// EXIT/LEAVE ROOM
// router.patch('/:room/leave/:owner', auth, async(req,res)=>{
router.patch('/:room/leaveroom', auth, async(req,res)=>{
    const room = await Room.findOne({name:req.params.room})
    if (!room) {
        return res.status(404).send("Room not found")
    }
    // const owner = await User.findOne({_id:req.params.user})
    const owner = await User.findOne({_id:req.body.user})
    // const total = await Total.findOne({ $and: [{ room: room._id }, { user: req.params.user }] })
    const total = await Total.findOne({ $and: [{ room: room._id }, { user: req.body.user }] })
    if(!total){
        return res.status(400).send("You are not in the room")
    }
    if(total.total !== total.dues){
        return res.status(400).send("Settle transactions in room before leaving")
    }
    
    // const users = room.users.filter((e)=> e.toString() !== req.params.user.toString())
    const users = room.users.filter((e)=> e.toString() !== owner._id.toString())
    room.users = users
    const rooms = owner.rooms.filter((e)=> e.toString() !== room._id.toString())
    owner.rooms = rooms
    
    await Total.findOneAndDelete({ $and: [{ room: room._id }, { user: req.body.user }] })
    // await Total.findOneAndDelete({ $and: [{ room: room._id }, { user: req.params.user }] })
    await room.save()
    await owner.save()

    // res.send({users:room, owner:owner, total:total})
    res.send({users:room, owner:owner})
})



module.exports = router
