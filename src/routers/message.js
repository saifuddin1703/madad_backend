const express = require('express');
const messagemodel = require('../models/emergency_message');
const app= express.Router()

app.get("/",(req,res)=>{
    messagemodel.find({}).sort({username:-1}).exec((err,users)=>{
        res.send(users)
        console.log(users);
    })
})


module.exports= app
