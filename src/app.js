const express = require('express')
const http = require('http')
const socket = require('socket.io')
const cors = require('cors')
require('./mongo/db')

const userRouter = require('./routes/userRouter')
const expenseRouter = require('./routes/expenseRouter')

const app = express()
const server = http.createServer(app)
// const io = socket(server)
const io = new socket.Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET", "POST"]
    }
})

io.on("connection",(socket)=>{
    console.log("User connected: ", socket.id)
})

// const room = require('./routes/room')(io)

app.use(cors())
app.use(express.json())
app.use(express.static('../client'))
app.use(userRouter)  
app.use(expenseRouter)
// app.use(room)  




app.listen(8000,()=>{
    console.log("Server up and running at port 8000")
})