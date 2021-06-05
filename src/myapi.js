const express= require('express');
const userrout= require("./routers/user")
const auth= require("./routers/authentication")
const app= express();
const http= require('http')
const messageModel= require("./models/emergency_message")
const port=process.env.PORT ||8000;
const admin= require('firebase-admin');

const serviceAccount= require('../firebase_service_private_key/madad-da602-firebase-adminsdk-ogr2s-86c67907b4.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
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
      // var data={

      // }
      var messagetosend= {
        data:{mes:'hellow'},
        notification:{
          title:"New notification",
          body:"sending from the server"
        },
        topic:"messagesSentByServer"
      }
      
      admin.messaging().send(messagetosend).then((response)=>{
            console.log("Successfully send message to all the clients");
      }).catch((error)=>{
        console.log(error);
      })
      message.save((err, message)=>{
           console.log("message saved to database");
      })
     
    });
  });
