const mongoose = require('mongoose');


const standbySchema= new mongoose.Schema({
    line:{
        type : String,
        required : true
    },
    effectiveness:{
        type: String,
        required : true
    },
    context:{
        type :String,
        required : true
    },
    user:{
        type :String,
        required :true
    }
})


const standup = mongoose.model('standups',standbySchema);


module.exports = standup