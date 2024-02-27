const express = require('express')
let app= express();
const {connectDB, checkConnected}=require('./db.js')

connectDB()

app.get("/",(req,res)=>{
    if(checkConnected()){
        res.send("Data base connection done")
    }
    else{
        res.send("Connection Failed")
    }
});

let port = 1300;

app.listen(port,()=>{
    console.log(`we are at port ${port}`)
})

module.exports= {
    app
}