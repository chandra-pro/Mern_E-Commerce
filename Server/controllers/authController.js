const Users = require("../models/User")
const Product = require("../models/Product")
const bcrypt=require("bcrypt")
require('dotenv').config()
const jwt = require("jsonwebtoken")




exports.registerController=async (req, res) => {
  try {
    const isExisting = await Users.findOne({ email: req.body.email });
    if (isExisting) {
      return res.status(404).json({ msg: "User already registered" });
    }

    if (req.body.username === "" || req.body.email === "" || req.body.password === "") {
      return res.status(500).json({ msg: "All fields must be filled" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await Users.create({ ...req.body, password: hashedPassword });
    await user.save();


    const {password, ...List} = user._doc
    const token = createToken(user);

    return res.status(201).json({ List, token });
  } catch (error) {
    return res.status(500).json(error);
  }
}
const createToken = (user) => {
  const payload = {
    id: user._id.toString(),
    email: user.email,
  };

  const token = jwt.sign(payload,process.env.JWT_SECRET);

  return token;
};