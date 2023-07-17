const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const connectDB = require("./config/db")
const userRoutes = require('./routes/userRoutes')
const ownerRoutes = require('./routes/ownerRoutes')
const superadminRoutes = require('./routes/superadminRoutes')
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares")
const bodyParser = require('body-parser');
const path = require("path");

const { Server } = require("socket.io")
const app = express();





app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
dotenv.config();
connectDB();
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials : true
}))

app.get("/", (req, res) => {
    res.send("API is running now also")
})


app.use('/',userRoutes)
app.use('/owner',ownerRoutes)
app.use('/superadmin',superadminRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT,console.log(`Server started on PORT ${PORT}`));

const io = new Server(server, {
    cors:{
        origin: 'http://localhost:3000',
        method: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    console.log(`User Connected ${socket.id}`);
    
    socket.on("join_room", (data)=>{
        socket.join(data)
        console.log(`User Joined with ${socket.id} joined room ${data}`);
    })

    socket.on("send_message", (data)=>{
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
    })


    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id);
    })
})