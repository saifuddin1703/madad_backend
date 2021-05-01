const mongoose= require("mongoose");

const loginmodelscheme= new mongoose.Schema({
   token: { type : String, requied : true},
    username:String,
    password:String
})

// const loginmodel= mongoose.model("LogedinUser",loginmodelscheme)
module.exports=  mongoose.model("LogedinUser",loginmodelscheme)