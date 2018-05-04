const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  db.Passed.find({})
      .then(data => {
        if (data) {
          res.json({passed: data});
        }
      }).catch(err => {
    res.status(500).send(err);
  });
});

router.post("/", (req, res) => {
  console.log("adding passed");


  db.Passed.create(req.body).then((err, savedPassedUser) => {
    if (err) return res.json(err);
    res.json(savedPassedUser);
  }).catch(() => res.status(500).send({error: "Could not save passed user"}));
});


module.exports = router;