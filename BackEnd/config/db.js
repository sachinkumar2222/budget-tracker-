const mongoose = require("mongoose");

const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log('mongoDb connected');
    }catch(err){
        console.error("errer while connection db",err);
        process.exit(1);
    }
};

module.exports = connectDb;