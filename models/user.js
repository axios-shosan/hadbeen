const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, 
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  password: {
    type: String,
    required: true,
  },

  isAdmin : {
    type: Boolean,
    default : false,
  }
 
});


//hashage du mdp
userSchema.pre('save', async function (next) {
  try {
    //si le mdp a était modifier alors le hasher 
    if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password, 13);
    }
    next();
  } catch (error) {
    console.error(`error while hashing the password !!!\n ${error}`);
  }
});

//methode qui compare si le mdp entré par l'utilsateur et le mdp dans la bdd sont les meme
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(this.password,password);
} 

const user = mongoose.model("user", userSchema);

module.exports = user;
