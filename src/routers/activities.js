const express= require('express');
const activityModel = require('../models/activities');
const app= express.Router();

app.get("/",(req,res)=>{
    activityModel.find({}).sort({time:-1}).exec((err,activities)=>{
       console.log(activities);
        res.send(activities);
    })
})


module.exports=app;