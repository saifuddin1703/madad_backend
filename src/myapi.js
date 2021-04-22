const express= require('express');
const app= express();
const port=process.env.PORT || 3000;
require("./db/db")

const model= require("./models/user")
app.listen(port,()=>{
    console.log("listening on port : "+port);
});
app.use(express.json())

// adding the user to database
app.post("/user",(req,res)=>{
   var user= new model(req.body);
   user.save((err,user)=>{
       console.log("user inserted");
       console.log(req.body)
   })
   res.status(200).send(req.body)
});

// get all the users stored in the database 
app.get("/user",(req,res)=>{
  model.find({},(err,users)=>{
        res.status(200).send(users);
        console.log(users);
    })
 })
 app.get("/",(req,res)=>{
   res.send("hellow")
   })
// get user by name
 app.get("/user/:name",(req,res)=>{
     const name= req.params.name;
    model.findOne({name: name},(err,users)=>{
          res.status(200).send(users);
          console.log(users);
      })
   })