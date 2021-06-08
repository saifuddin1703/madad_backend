const express= require('express');
const userrout= require("./routers/user")
const messagerout= require("./routers/message")
const auth= require("./routers/authentication")
const activityrout=require("./routers/activities")
const app= express();
const http= require('http')
const messageModel= require("./models/emergency_message")
const port=process.env.PORT ||8000;
const admin= require('firebase-admin');
const serviceAccount= require('../firebase_service_private_key/madad-da602-firebase-adminsdk-ogr2s-86c67907b4.json');
const activityModel = require('./models/activities');

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
app.use("/message",messagerout);
app.use("/activities",activityrout)
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
          var activity= new activityModel({
            sender:message.sendBy,
            time:message.sentAt,
            title:message.title,
            messageid:message._id
          })

          activity.save((err,activity)=>{
            console.log("activity saved");
            console.log.(activity);
          })
    
        var messagetosend= {
          data:{messageid:String(message._id)},
          notification:{
            title:message.title,
            // checking if the length of the description is more than 100 words 
            body:(message.description.length<=30)? message.description: message.description.substring(0,31) 
          },
          topic:"messagesSentByServer"
        }


        admin.messaging().send(messagetosend).then((response)=>{
          console.log("Successfully send message to all the clients");
    }).catch((error)=>{
      console.log(error);
    })

   })
        
    });
  });
