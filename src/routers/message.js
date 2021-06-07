const express = require('express');
const usermodel = require('../models/user');
const app= express.Router()

app.get("/",(req,res)=>{
    usermodel.find({}).sort({username:-1}).exec((err,users)=>{
        res.send(users)
        console.log(users);
    })
})


module.exports= app
