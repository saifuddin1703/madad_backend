const express= require('express');
const app= express();
const port=process.env.PORT || 3000;
require("./db/db")
const auth= require("./models/loggedin")
const jwt= require("jsonwebtoken")
const model= require("./models/user")
const loginmodel= require("./models/loggedin")
const signup= require("./models/signedupusers")
app.listen(port,()=>{
    console.log("listening on port : "+port);
});
app.use(express.json())


app.delete("/logout",(req,res)=>{
    const username= req.username;
    const password= req.password;
    loginmodel.findOne({username:username},(err,user)=>{
      await user.delete()
      res.status(200).send("logged out");
    })
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
            signupref.save((err,model)=>{
                console.log(token)
                console.log("signin successfull")
            })
            //after signin adding the user to loged in user collection
            loginref.save((err,model)=>{
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

            usermodel.save((err,user)=>{
                res.send(usermodel)
                console.log(token)
            })
        }
    })
})


// adding the user to database
app.post("/user",(req,res)=>{
   var user= new model( {username:req.body.username,
    displayname:req.body.displayname,
    age:req.body.age,
    phone:req.body.phone,
    address:req.body.address,
    token:token});
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
 app.get("/new",(req,res)=>{
   res.send("hellow")
   })
// get user by name
 app.get("/user/:token",(req,res)=>{
     const name= req.params.token;
    model.findOne({token: token},(err,users)=>{
          res.status(200).send(users);
          console.log(users);
      })
   })

   app.get("/",(req,res)=>{
    res.send("api is running");
  })