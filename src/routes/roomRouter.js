const express = require('express')

const auth = require('../middlewares/auth')
const User = require('../mongo/models/users')
// const Expense = require('../mongo/models/expense')
const Room = require('../mongo/models/room')

const router = new express.Router()

// create room
router.post('/room/create', auth, async (req, res) => {
    console.log("hi")
    const user = req.user
    try {
        const room = new Room(req.body)
        console.log(user._id)
        room.users.push(user._id)
        await room.save()

        const ourUser  = await User.findById(user._id)
        ourUser.rooms.push(room._id)
        await ourUser.save()
        console.log(ourUser)
        res.send(room)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/room/join', auth, async (req, res) => {
    // console.log('hi')
    const user = req.user

    try {
        const name = req.body.name
        const room = await Room.findOne({ name })
        if (!room) {
            res.status(404).send("Room not found")
        }
        else {
            const ourUser = await User.findById(user._id)
            if (room.password === req.body.password) {
                if (!room.users.includes(user._id)) {
                    room.users.push(user._id)
                    await room.save()
                    ourUser.rooms.push(room._id)
                    await ourUser.save()
                }
                res.send({room,user})
            }
            else {
                res.status(404).send("Room not found")
            }
        }
    } catch (error) {

    }
})

module.exports = router