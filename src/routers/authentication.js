const auth= require("../models/loggedin")
const jwt= require("jsonwebtoken")
const model= require("../models/user")
const express= require("express");
const loginmodel= require("../models/loggedin")
const signup= require("../models/signedupusers")
const app = express.Router()
 const upload = require("../imageuploading")
app.post("/image",upload,(req,res)=>{
    res.status(200).send(req.file.path);
})

// method to login user
app.post("/login",(req,res)=>{
    const username= req.body.username;
    const password= req.body.password;
    signup.findOne({username:username},(err,user)=>{
        if(user==null){
         res.send("Invalid usrename or not signed up");
        }else{
           if(password!=user.password){
            res.send("Invalid password")
           }else{
              loginref= new loginmodel({
                token:user.token,
                username:username,
                password:password
              })
                 
              loginref.save(function(err,user){
                  res.status(200).send(user);
              })
           }
    
        }
    })
    
    })


    app.delete("/logout",(req,res)=>{
        const username= req.body.username;
        loginmodel.findOne({username:username},async (err,user)=>{
          await user.delete()
          res.status(200).send("logged out");
        })
    })
    
    //method to signup the user
    app.post("/signup",(req, res)=>{
        //checking if the user already signed up or not
        model.findOne({username: req.body.username},(err, user)=>{
           //user already signedup
            if(user!=null) res.status(400).send("user exists");
            // user is not signed up
            if(user==null){
                //creating jwt for the user credentials
                const token=  jwt.sign({username:req.body.username,password:req.body.password},"ffffaaffaffffffffffffffffffffffffffff")
                const loginref= new auth({token:token,username:req.body.username,password:req.body.password});
               //singing up the user 
                const signupref=new signup({token:token,
                    username:req.body.username,
                    password:req.body.password});
                signupref.save(()=>{
                    console.log(token)
                    console.log("signin successfull")
                })
                //after signin adding the user to loged in user collection
                loginref.save(()=>{
                    console.log(token)
                    console.log("login successfull")
                })
    
            // adding the user to the user collection
                const usermodel= new model({
                    username:req.body.username,
                    displayname:req.body.displayname,
                    age:req.body.age,
                    phone:req.body.phone,
                    address:req.body.address,
                    token:token,
                })
    
                usermodel.save(()=>{
                    res.send(usermodel)
                    console.log(token)
                })
            }
        })
    })

    module.exports=app