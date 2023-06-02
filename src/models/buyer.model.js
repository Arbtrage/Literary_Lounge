const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buyerSchema = new Schema(
  {
    userInfo: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    address: {
      type: String,
      select:false,
      required: false,
    },
    phoneNumber: {
      type: String,
      select:false,
      required: false,
    },
    wishlist: {
      type: [mongoose.Schema.ObjectId],
      ref: "Books",
      required: false,
    },
    orders: {
      type: [mongoose.Schema.ObjectId],
      ref: "Order",
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Buyer", buyerSchema);
