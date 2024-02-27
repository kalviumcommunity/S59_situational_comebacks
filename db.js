require('dotenv').config()
const mongoose= require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
        console.log("Mongo Connected");
    }
    catch(err){
        console.log("Connection Failed")
    }
}


const disconnectDB = async()=>{
    mongoose.disconnect()
    console.log("MoongoDB Disconnected")
}

const checkConnected=()=>{
    return mongoose.connection.readyState===1 ; 
}
// this function will return true or false on bases of if databases is connected or not 

module.exports={
    connectDB,
    disconnectDB,
    checkConnected
}