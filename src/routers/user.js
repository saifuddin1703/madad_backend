// const { modelName } = require("../models/loggedin");
const model= require("../models/user")
const express= require("express");

const app = express.Router()

// adding the user to database
app.post("/add",(req,res)=>{
    var user= new model( {username:req.body.username,
     displayname:req.body.displayname,
     age:req.body.age,
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
 app.get("/",(req,res)=>{
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

  module.exports= app