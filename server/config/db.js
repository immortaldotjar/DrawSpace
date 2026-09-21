import mongoose from "mongoose";

const db = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo DataBase Connected!");
    
    }catch(err){
        console.error("Mongo DB failed to connect :",err.message)
        process.exit(1)
    }
}

export default db