const express = require('express')

let app= express();

app.get("/ping",(req,res)=>{
    res.send("App Created")
})

let port = 1300;

app.listen(port,()=>{
    console.log(`we are at port ${port}`)
})
