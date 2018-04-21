const express = require("express");
const router = express.Router();
const dbQuestion = require("../models/question");

router.post("/", (req, res) => {
  console.log("creating question");


  dbQuestion.create(req.body).then((err, savedQuestion) => {
    if (err) return res.json(err);
    res.json(savedQuestion);
  }).catch(() => res.status(500).send({error: "Could not create question"}));
});


module.exports = router;