const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../util/config");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const registerUser = async (req, res) => {
  const body = req.body;
  const passwordHash = await bcrypt.hash(body.password, 10);

  const newUser = new User({
    username: body.username,
    email: body.email,
    passwordHash,
  });

  try {
    await newUser.save();
    const userForToken = {
      username: newUser.username,
      id: newUser.id,
    };
    const token = jwt.sign(userForToken, JWT_SECRET);
    res.json({ token, ...userForToken });
  } catch (error) {
    res.json({ error });
  }
};

const loginUser = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ username: body.username });
  const isPasswordCorrect = user
    ? await bcrypt.compare(body.password, user.passwordHash)
    : false;

  if (!isPasswordCorrect) {
    return res.status(400).send({ error: "Invalid username or password" });
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(userForToken, process.env.JWT_SECRET);
  res.json({ token, ...userForToken });
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
};
