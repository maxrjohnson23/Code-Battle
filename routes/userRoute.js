const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../passport");

router.post("/", (req, res) => {

  const {username, password} = req.body;

  db.User.findOne({username: username}, (err, user) => {
    if (err) {
      console.log("UserRoute.js post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      });
    }
    else {
      const newUser = new db.User({
        username: username,
        password: password,
        score: 0
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.post(
    "/login",
    function (req, res, next) {
      console.log("routes/userRoute.js, login, req.body: ");
      console.log(req.body);
      next();
    },
    passport.authenticate("local"),
    (req, res) => {
      console.log("logged in", req.user);
      var userInfo = {
        username: req.user.username,
        score: req.user.score
      };
      res.send(userInfo);
    }
);

router.patch("/:id", (req, res) => {
  const score = req.body.score;
  db.User.findOneAndUpdate({username: req.params.id}, {
    $inc: {
      score: score,
      gamesplayed: 1
    }
  }, {new: true}).then((data) => {
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({error: "No user found for this id"});
    }
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.get("/", (req, res) => {
  console.log("Getting user: ", req.user);
  if (req.user) {
    res.json({user: req.user, score: req.score});
  } else {
    res.json({user: null});
  }
});

router.get("/leaderboard", (req, res) => {
  db.User.find({}).select("username score").sort("-score")
      .then(data => {
        if (data) {
          res.json(data);
        }
      }).catch(err => {
    res.status(500).send(err);
  });
});

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({msg: "logging out"});
  } else {
    res.send({msg: "no user to log out"});
  }
});

module.exports = router;