const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
      select: false,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    role: {
      type: String,
      enum: ["Buyer", "Seller"],
      required:true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);


userSchema.pre('save',async function(next){
    //Password hashing
    try {
        if(this.isNew){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.isValidPassword=async (sentPassword)=>{
    return await bcrypt.compare(sentPassword,this.password);
}

const User=mongoose.model('User',userSchema);

module.exports=User;