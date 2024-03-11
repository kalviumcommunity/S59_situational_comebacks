const mongoose = require('mongoose');


const postSchema= new mongoose.Schema({
    line:{
        type : String
        
    },
    effectiveness:{
        type: String
        
    },
    context:{
        type :String
    },
    user:{
        type :String,
        required :true
    }
})

const postup = mongoose.model('posts',postSchema);

module.exports = postup