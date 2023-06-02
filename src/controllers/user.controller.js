const User = require("../models/user.model");
const Buyer = require("../models/buyer.model");
const Seller = require("../models/seller.model");
const jwt = require("../utils/jwt");

module.exports = {
  register: async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const isExisting = await User.findOne({ email });
      if (isExisting) {
        throw new Error("Already such an email registered");
      }

      const newUser = new User({
        email,
        password,
        name,
        role,
      });

      const user = await newUser.save();

      if (role == "Buyer") {
        const newBuyer = await (
          await Buyer.create({ userInfo: user._id, email: user.email })
        ).populate("userInfo");
        res.status(201).json({ user: user, UserDetails: newBuyer });
      } else {
        const newSeller = await (
          await Seller.create({ userInfo: user._id, email: user.email })
        ).populate("userInfo");
        res.status(201).json({ user: user, UserDetails: newSeller });
      }
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email/Password field cannot be empty");
    }
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        throw new Error("Email/Password might be incorrect");
      }
      const isPasswordValid = await user.isPasswordValid(password);
      if (!isPasswordValid) {
        throw new Error("Email/password might not be correct");
      }

      //Login for separate users(Buyers/Sellers)
      let currentUser;
      if (user.role == "Seller") {
        currentUser = await Seller.findOne({ userInfo: user._id }).populate(
          "userInfo"
        );
      } else {
        currentUser = await Buyer.findOne({ userInfo: user._id }).populate(
          "userInfo"
        );
      }
      const token = jwt.encode(currentUser._id);
      res.json({ User: currentUser.userInfo.name, Token: token });
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  },
};
