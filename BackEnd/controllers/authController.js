const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {validatePassword} = require("../utils/helper")

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;


  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are Require" });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "error registering user", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invaild credentials" });
    }

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "error login user", error: err.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "error getting info user", error: err.message });
  }
};


