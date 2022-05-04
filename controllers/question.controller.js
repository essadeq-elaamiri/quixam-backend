const db = require("../models/main");

const questionModel = db.questionModel;

// Create and Save a new Question
exports.create = (req, res) => {
  // Validate request

  // TODO: Other validation
  // Create a question
  const question = new questionModel({
    content: req.body.content,
    score: req.body.score,
    duration: req.body.duration,
  });
  // Save question to the database
  question
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Question.",
      });
    });
};
// Retrieve all Questions from the database.
exports.findAll = (req, res) => {
  let page = req.query.page ? req.query.page : 0;
  let size = req.query.size ? req.query.size : 5;
  questionModel
    .find({}, null, { skip: page * size, limit: size })
    .then((data) => {
      questionModel
        .count({})
        .then((count) => {
          const _data = { data: data };
          _data.page = page;
          _data.coutPerPage = size;
          _data.total = count;

          res.json(_data);
        })
        .catch((err) => {
          res.status(500).json({
            message:
              err.message || "Some error occurred while counting records.",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message ||
          "Some error occurred while retrieving the Questions list.",
      });
    });
};
// Find a single Question with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  questionModel
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).json({ message: "No Question found with id " + id });
      else res.json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error retrieving Question with id=" + id });
    });
};
// Update a Question by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Update data can not be empty!",
    });
  }
  const id = req.params.id;
  questionModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Question with id=${id}. Maybe Question was not found!`,
        });
      } else res.json({ message: "Question was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error updating Question with id=" +
          id +
          ". Maybe Question was not found!",
      });
    });
};
// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  questionModel
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete Question with id=${id}. Maybe it was not found!`,
        });
      } else {
        res.json({
          message: "Question was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Could not delete Question with id=" +
          id +
          ". Maybe it was not found!",
      });
    });
};
// Delete all Questions from the database.
exports.deleteAll = (req, res) => {
  questionModel
    .deleteMany({})
    .then((data) => {
      res.json({
        message: `${data.deletedCount} Question records were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while removing all records.",
      });
    });
};

// Find all quiz Questions
exports.findQuestionQuiz = (req, res) => {
  const id = req.params.id;
  questionModel
    .findById(id)
    .then((question) => {
      if (!question)
        res.status(404).json({ message: "No Question found with id " + id });
      else {
        // find teacher
        db.quizModel
          .findById(question.quiz)
          .then((quiz) => {
            res.json(quiz);
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error retrieving Quiz with id=" + quiz.teacher,
            });
          });
        // add teacher
        // res.json(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error retrieving Question with id=" + id });
    });
};
exports.findQuestionAnswers = (req, res) => {
  const id = req.params.id;
  questionModel
    .findById(id)
    .then((question) => {
      if (!question)
        res.status(404).json({ message: "No Question found with id " + id });
      else {
        // find teacher
        db.answerModel
          .find({
            _id: { $in: question.answers },
          })
          .then((answers) => {
            res.json(answers);
          })
          .catch((err) => {
            res.status(500).json({
              message: err,
            });
          });
        // add teacher
        // res.json(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error retrieving Question with id=" + id });
    });
};
exports.associateQuizToQuestion = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data can not be empty!",
    });
  }
  // TODO: __
  const id = req.params.id;
  questionModel
    .findByIdAndUpdate(
      id,
      { quiz: req.body.quizID },
      { useFindAndModify: false }
    )
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Question with id=${id}. Maybe Quiz was not found!`,
        });
      } else res.json({ message: "Question was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error updating Question with id=" +
          id +
          ". Maybe Question was not found!",
      });
    });
};
exports.addAnswerToQuestion = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data can not be empty!",
    });
  }
  // TODO: __
  const id = req.params.id;
  questionModel
    .findByIdAndUpdate(
      id,
      { $addToSet: { answers: req.body.answerID } },
      { useFindAndModify: false }
    )
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Question with id=${id}. Maybe Quiz was not found!`,
        });
      } else res.json({ message: "Quiz was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error updating Question with id=" +
          id +
          ". Maybe Quiz was not found!",
      });
    });
};
exports.deleteQuizFromQuestion = (req, res) => {};
exports.deleteAnswerFromQuestion = (req, res) => {};
