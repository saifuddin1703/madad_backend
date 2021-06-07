const mongoose= require('mongoose');

const messageSchema= new mongoose.Schema({
    sentBy:{
        type:String,
        required: true
    },
    sentAt:{
        type:String,
        required: true
    },
    sentFrom:{
        latitude:{type: String},
        longitude: {type: String}
    },
    title:{
          type: String,
          required: true
    },
    Type:{
        type:String,
        required:true,
        default:"Major"
    },
    imageUrl:String,
    description:{
        type:String,
        required: true
    },
    seenBy:{
        type:Array,
        default:[]
    },
    helped:{
        type:Boolean,
        default: false,
        required: true
    }
})


const messagemodel= mongoose.model("message",messageSchema);

module.exports=messagemodel;