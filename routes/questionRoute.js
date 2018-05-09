const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  db.Question.find({})
      .then(data => {
        if (data) {
          res.json({questions: data});
        }
      }).catch(() => {
    res.status(500).send({error: "Error while retrieving question"});
  });
});

router.get("/:id", (req, res) => {
  // Get random question
  if (req.params.id === "random") {
    // Get the count of all questions
    db.Question.count().then((count) => {
      // Get a random entry
      const random = Math.floor(Math.random() * count);
      db.Question.findOne().skip(random).then(
          (result) => {
            if (result) {
              res.json({question: result});
            } else {
              res.status(404).send({error: "No questions found"});
            }
          });
    }).catch(() => {
      res.status(500).send({error: "Error while retrieving question"});

    });
  } else {
    // find question by id
    db.Question.findById(req.params.id)
        .then(result => {
          if (result) {
            res.json({question: result});
          } else {
            res.status(404).send({error: "Question not found"});
          }
        }).catch(() => {
      res.status(500).send({error: "Error while retrieving question"});
    });
  }
});


router.get("/random-question", (req, res) => {

});

router.post("/", (req, res) => {
  console.log("creating question");


  db.Question.create(req.body).then((savedQuestion) => {
    res.json(savedQuestion);
  }).catch(() => res.status(500).send({error: "Could not create question"}));
});


module.exports = router;