const express = require('express')
const bcrypt = require('bcryptjs')
require('./mongo/db')
const User = require('./mongo/models/users')
const Expense = require('./mongo/models/expense')
const auth = require('./middlewares/auth')


const app = express()
app.use(express.json())

app.post('/signup', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.generateAuthToken()
        await user.save()
        res.send({user})
    }
    catch(e){
        res.status(500).send(e)
    }
})

app.post('/login', async(req, res)=>{
    const email = req.body.email
    const user =await User.findOne({email})
    if(!user){
        res.status(404).send("Wrong credentials")
    }
    else{
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(isMatch){
            await user.generateAuthToken()
            res.status(200).send(user)
        }
        else{
            res.status(404).send("Wrong credentials")
        }
    }
})

app.get('/',auth, async(req,res)=>{
    res.send(`Hiii, ${req.user.name}`)
})




app.post('/addexpense', auth, async(req,res)=>{
    const inp = req.body
    try {
        const expense = new Expense(inp)
        await expense.save()
    } catch (error) {
        
    }
})

app.listen(3000,()=>{
    console.log("Server up and running at port 3000")
})