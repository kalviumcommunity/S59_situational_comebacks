const mongoose = require('mongoose');


const familySchema= new mongoose.Schema({
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

const family = mongoose.model('familys',familySchema);

module.exports = family