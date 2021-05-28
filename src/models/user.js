const mongoose= require("mongoose")

// creating the user schema 
const usersc= new mongoose.Schema({
    username:{type:String,
        default:"",
        unique:true
        },
    displayname:{type:String,
    default:""
    },
    DOB:{type:String,
        default:""
        },
    phone:{type:String,
        default:""
        },
    imageUrl:{
        type:String,
        default:" "
    },
    token:{type:String,
        default:""
        }
})

// creating the model from the schema which point to the data collection in mongodb
const usermodel= mongoose.model("user",usersc)

// module 
module.exports=usermodel