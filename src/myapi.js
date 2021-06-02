const express= require('express');
const userrout= require("./routers/user")
const auth= require("./routers/authentication")
const app= express();
const http= require('http')
const messageModel= require("./models/emergency_message")
const port=process.env.PORT ||8000;
const server= app.listen(port,()=>{
  console.log("listening on port : "+ port)
})

const io= require('socket.io')(server)
require("./db/db") 

app.use(express.json())
app.use("/user",userrout);
app.use('/uploads', express.static('./uploads'));
app.use("/authentication",auth);


 app.get("/new",(req,res)=>{
   res.send("hellow")
   })


   app.get("/",(req,res)=>{
    res.send("api is running");
  })


  io.on("connection", (socket) => {
    socket.on("message", (arg) => {
      console.log(arg);
      var message= new messageModel(arg)

      message.save((err, message)=>{
           console.log("message saved to database");
      })
      socket.broadcast.emit("hello","message recieved")
    });
  });
