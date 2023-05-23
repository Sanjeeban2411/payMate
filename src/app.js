const express = require('express')
// const path = require('path')
// const http = require('http')
const cors = require('cors')
// const socket = require('socket.io')
require('./mongo/db')

const userRouter = require('./routes/userRouter')
const expenseRouter = require('./routes/expenseRouter')
const roomRouter = require('./routes/roomRouter')

const app = express()
// const server = http.createServer(app)
// const io = socket(server)
// const io = new socket.Server(server,{
//     cors:{
//         origin:"http://localhost:3000",
//         methods:["GET", "POST"]
//     }
// })

// io.on("connection",(socket)=>{
//     console.log("new connection")
// })

// const room = require('./routes/room')(io)

app.use(cors())
app.use(express.json())
app.use(express.static('../client'))
app.use(userRouter)  
app.use(expenseRouter)
app.use(roomRouter)
// app.use(room)  

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'))

//     app.get('*', (req,res)=>{
//         res.sendFile(path.join(__dirname,'client', 'build', 'index.html'))
//     })
// }


const port =8000
// const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`Server up and running at port ${port}`)
})