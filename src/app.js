const express = require('express')
require('./mongo/db')
const User = require('./mongo/models/users')

const app = express()
app.use(express.json())

app.post('/signup', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        // console.log(user)
        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

app.get('/',(req,res)=>{
    res.send('hii')
})

app.listen(3000,()=>{
    console.log("Server up and running at port 3000")
})