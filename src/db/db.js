const mongoose= require("mongoose")
// url of the host where the mongo process is running
const url= process.env.MONGODB_URI ||"mongodb://localhost:27017/userdb"
// just confirming whether the it is imported or not
console.log("db is imported")

// connecting mongoose with the mongod process
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connection successfull");
})

