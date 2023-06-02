const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema(
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
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    books: {
      type: [mongoose.Schema.ObjectId],
      ref: "Books",
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);
