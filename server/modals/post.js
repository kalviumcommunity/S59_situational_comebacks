const mongoose = require('mongoose');
const crypto =require('crypto')


const postSchema= new mongoose.Schema({
    userName:{
        type : String,
        required :true
    },
    emailId:{
        type: String,
        required :true
    },
    userId:{
        type :String,
        required :true
    },
    password:{
        salt: String,
        hash:String
    }
})

postSchema.methods.setPassword = function (password) {
    this.password.salt = crypto.randomBytes(16).toString('hex');
    this.password.hash = crypto
      .pbkdf2Sync(password, this.password.salt, 1000, 64, 'sha512')
      .toString('hex');
  };
  
  postSchema.methods.validatePassword = function (password) {
    const hash = crypto
      .pbkdf2Sync(password, this.password.salt, 1000, 64, 'sha512')
      .toString('hex');
    return this.password.hash === hash;
  };

  const postup = mongoose.model('authusers', postSchema);

module.exports = postup