const express= require('express');
const userrout= require("./routers/user")
const auth= require("./routers/authentication")
const app= express();
const http= require('http')
const server= http.createServer(app)
const io= require('socket.io')(server)
const port=process.env.PORT ||8000;

require("./db/db")

server.listen(port,()=>{
    console.log("listening on port : "+port);
});
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
    socket.on("message", (arg,callback) => {
      console.log(arg); // world
      callback({
        status: "ok"
      });
    });
  });

  io.on("connection", (socket) => {
    socket.broadcast.emit("hello", "world");
  });