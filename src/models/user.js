const mongoose= require("mongoose")

// creating the user schema 
const usersc= new mongoose.Schema({
    name:String,
    age:String,
    phone:String,
    address:String
})

// creating the model from the schema which point to the data collection in mongodb
const usermodel= mongoose.model("user",usersc)

// module
module.exports=usermodel