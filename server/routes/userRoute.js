const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = require("express").Router();

//UPDATE USER
router.put("/:username", async (req, res) => {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
  try {
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      {
        $set: req.body,
      },
      { new: true }
    );

    const { avatar, email, username, description } = user;
    res.status(200).json({ avatar, email, username, description });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
//GET ALL USERS
router.post("/filter", async (req, res) => {
  try {
    const users = await User.find();
    const searchResult = users.filter(
      (user) =>
        user.username.toLowerCase().indexOf(req.body.string.toLowerCase()) > -1
    );
    return res.status(200).json(searchResult);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
//GET A USER
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//ADD A FRIEND
router.post("/addfriend", async (req, res) => {
  try {
    const [INCOMING, OUTGOING] = ["INCOMING", "OUTGOING"];
    const user = await User.findOne({ username: req.body.source });

    // If request already sent
    const exists = user.requests.find(
      (request) => request.destination === req.body.destination
    );
    if (exists) return res.status(301).json("Invite already pending");

    //TODO - If destination already sent request accept it
    // FIX IT, NE RADI
    const destinationUser = await User.findOne({
      username: req.body.destination,
    });
    const addedBefore = destinationUser.requests.find(
      (request) => request.source === req.body.source
    );

    if (addedBefore)
      return res
        .status(300)
        .json({ message: "Invite already pending from other user" });
    if (!addedBefore && !exists) {
      await User.findOneAndUpdate(
        { username: req.body.source },
        {
          $push: {
            requests: {
              source: req.body.source,
              destination: req.body.destination,
              type: OUTGOING,
            },
          },
        },
        { new: true }
      );

      await User.findOneAndUpdate(
        { username: req.body.destination },
        {
          $push: {
            requests: {
              source: req.body.source,
              destination: req.body.destination,
              type: INCOMING,
            },
          },
        },
        { new: true }
      );

      res.status(200).json("Request sent");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

//GET REQUESTS
router.get("/requests/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    const request = await Promise.all(
      user.requests?.map(async (request) => {
        if (request.type === "OUTGOING") {
          const destination = await User.findOne({
            username: request.destination,
          });
          const { avatar, username, description } = destination;
          return {
            avatar,
            username,
            description,
            type: request.type,
          };
        } else {
          const source = await User.findOne({ username: request.source });
          const { avatar, username, description } = source;

          return {
            avatar,
            username,
            description,
            type: request.type,
          };
        }
      })
    );

    res.status(200).json(request);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});
module.exports = router;
