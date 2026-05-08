const mongoose=require("mongoose");
require("dotenv").config();

async function connectDb(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected!");
    }
    catch(err){
        console.log(error);
    }
}

module.exports=connectDb