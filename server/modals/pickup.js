const mongoose = require('mongoose');


const pickUpSchema= new mongoose.Schema({
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

const pickup = mongoose.model('pickups',pickUpSchema);

module.exports = pickup