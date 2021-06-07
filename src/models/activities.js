const mongoose= require('mongoose');

const activitySchema= new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    messageid:{
        type:String,
        required:true
    }
})

const activityModel= mongoose.model("activity",activitySchema);

module.exports= activityModel