const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    seller:{
      type:[mongoose.Schema.ObjectId],
      required:true,
      select:false
    },
    name: {
      type: String,
      required: true,
    },
    author:{
      type:String,
      required:true
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required:true,
    },
    category:{
        type:String,
        required:true,
    },
    dateOfPurchase: {
      type: Date,
      required:false,
      default: new Date(),
    },
    availableAt: {
      type: String,
      required: true,
    },
    price:{
        type:Number,
        required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Books", bookSchema);
