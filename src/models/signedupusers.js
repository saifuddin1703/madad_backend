const mongoose= require("mongoose");

const signupscheme= new mongoose.Schema({
   token: { type : String, requied : true},
    username:String,
    password:String
})

// const signupmodel= mongoose.model("SignupUser",signupscheme)
module.exports= mongoose.model("SignupUser",signupscheme)