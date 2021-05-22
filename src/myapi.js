const express= require('express');
const userrout= require("./routers/user")
const auth= require("./routers/authentication")
const app= express();
const port=process.env.PORT || 8000||3000;

require("./db/db")

app.listen(port,()=>{
    console.log("listening on port : "+port);
});
app.use(express.json())
app.use("/user",userrout);
app.use('/uploads', express.static('./uploads'));
app.use("/authentication",auth);


 app.get("/new",(req,res)=>{
   res.send("hellow")
   })


   app.get("/",(req,res)=>{
    res.send("api is running");
  })