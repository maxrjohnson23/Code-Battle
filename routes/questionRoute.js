const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  db.Question.find({})
      .then(data => {
        if (data) {
          res.json({questions: data});
        }
      }).catch(err => {
    res.status(500).send(err);
  });
});

router.post("/", (req, res) => {
  console.log("creating question");


  db.Question.create(req.body).then((err, savedQuestion) => {
    if (err) return res.json(err);
    res.json(savedQuestion);
  }).catch(() => res.status(500).send({error: "Could not create question"}));
});


module.exports = router;