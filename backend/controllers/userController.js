import validator from "validator";
import bycrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter a strong password not less then 8 charcters",
      });
    }
    // hashing use password

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log("erroe", error);
    res.json({ success: false, message: error.message });
  }
};

//API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }
    const user = userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exits" });
    }
    const ismatch = await bycrypt.compare(password, user.password);
    if (ismatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
     return res.json({ success: true, token });
    } else {
     return res.json({ success: false, message: "invalid Credentials" });
    }
  } catch (error) {
    console.log("erroe", error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser };
