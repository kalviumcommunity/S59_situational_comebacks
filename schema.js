const mongoose = require('mongoose');

const pickUpSchema= new mongoose.Schema({
    line:{
        type : String,
        required : true
    },
    effectiveness:{
        type: String,
        // required : true
    },
    category:{
        type :String,
        // required : true
    }
})

const pickup = mongoose.model('pickup',pickUpSchema);

module.exports = pickup