const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Register
router.post("/register", async (req, res) => {
  const usernameTaken = await User.findOne({ username: req.body.username });
  const emailTaken = await User.findOne({ email: req.body.email });

  if (usernameTaken)
    return res.status(500).json({ message: "Username already in use" });
  if (emailTaken)
    return res.status(500).json({ message: "Email already in use" });
  else {
    try {
      //Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //Create new user
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      const registeredUser = await user.save();

      res.status(200).json(registeredUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).json({ message: "Wrong password" });
    const token = jwt.sign(
      { username: user.username, email: user.email },
      process.env.JWT_SECRET
    );

    const { avatar, username, email, isAdmin } = user._doc;
    res.status(200).json({ token, avatar, username, email, isAdmin });
  } catch (error) {
    console.log("called");
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;
