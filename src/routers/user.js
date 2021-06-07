// const { modelName } = require("../models/loggedin");
const model= require("../models/user")
const messagemodel= require("../models/emergency_message")
const express= require("express");
const usermodel = require("../models/user");
const app = express.Router()

// adding the user to database
app.post("/add",(req,res)=>{
    var user= new model( {username:req.body.username,
     displayname:req.body.displayname,
     DOB:req.body.DOB,
     phone:req.body.phone,
     address:req.body.address,
     imageUrl:req.body.imageUrl,
     token:req.body.token,

    });
    user.save((err,user)=>{
        console.log("user inserted");
        console.log(req.body)
    })
    res.status(200).send(req.body)
 });
 
 // get all the users stored in the database 
 app.get("/allusers",(req,res)=>{
   model.find({},(err,users)=>{
         res.status(200).send(users);
         console.log(users);
     })
  })
  // get user by token
 app.get("/:token",(req,res)=>{
    const token= req.params.token;
   model.findOne({token},(err,users)=>{
         res.status(200).send(users);
         console.log(users);
     })
  })

  app.get("/:id",(req,res)=>{
    const _id= req.params.id;
   messagemodel.findById({_id},(err,message)=>{
       console.log(message);
       res.status(200).send(message)
   })
  })


  app.get("/",(req,res)=>{
     model.find({}).sort({username:-1}).exec((err,users)=>{
         console.log(users)
        res.send(users)
     })

  })
  module.exports= app