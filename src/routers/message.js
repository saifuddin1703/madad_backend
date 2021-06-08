const express = require('express');
const messagemodel = require('../models/emergency_message');
const app= express.Router()

app.get("/",(req,res)=>{
    messagemodel.find({}).sort({username:-1}).exec((err,users)=>{
        res.send(users)
        console.log(users);
    })
})


app.get("/:id",(req,res)=>{
    const _id= Object(req.params.id);
   messagemodel.findById({_id},(err,message)=>{
       console.log(message);
       res.status(200).send(message)
   })
  })
module.exports= app
