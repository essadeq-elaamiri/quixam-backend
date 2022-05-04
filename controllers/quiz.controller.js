const db = require("../models/main");

const quizModel = db.quizModel;

// Create and Save a new Quiz
exports.create = (req, res) => {
  // Validate request

  // TODO: Other validation
  // Create a quiz
  const quiz = new quizModel({
    title: req.body.title,
    descripion: req.body.descripion,
    deadLine: req.body.deadLine,
    time: req.body.time,
  });
  // Save quiz to the database
  quiz
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the Quiz.",
      });
    });
};
// Retrieve all Quizes from the database.
exports.findAll = (req, res) => {
  let page = req.query.page ? req.query.page : 0;
  let size = req.query.size ? req.query.size : 5;
  quizModel
    .find({}, null, { skip: page * size, limit: size })
    .then((data) => {
      quizModel
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
          "Some error occurred while retrieving the Quizes list.",
      });
    });
};
// Find a single Quiz with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  quizModel
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).json({ message: "No Quiz found with id " + id });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving Quiz with id=" + id });
    });
};
// Update a Quiz by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Update data can not be empty!",
    });
  }
  // TODO: __
  // validate the teacher
  // validate the students
  // validate the questions
  const id = req.params.id;
  quizModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Quiz with id=${id}. Maybe Quiz was not found!`,
        });
      } else res.json({ message: "Quiz was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error updating Quiz with id=" + id + ". Maybe Quiz was not found!",
      });
    });
};
// Delete a Quiz with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  quizModel
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete Quiz with id=${id}. Maybe it was not found!`,
        });
      } else {
        res.json({
          message: "Quiz was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Could not delete Quiz with id=" + id + ". Maybe it was not found!",
      });
    });
};
// Delete all Quizes from the database.
exports.deleteAll = (req, res) => {
  quizModel
    .deleteMany({})
    .then((data) => {
      res.json({
        message: `${data.deletedCount} Quiz records were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while removing all records.",
      });
    });
};

// Find all quiz Quizs
exports.findQuizTeacher = (req, res) => {
  const id = req.params.id;
  quizModel
    .findById(id)
    .then((quiz) => {
      if (!quiz)
        res.status(404).json({ message: "No Quiz found with id " + id });
      else {
        // find teacher
        db.teacherModel
          .findById(quiz.teacher)
          .then((teacher) => {
            res.json(teacher);
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error retrieving Teacher with id=" + quiz.teacher,
            });
          });
        // add teacher
        // res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving Quiz with id=" + id });
    });
};
exports.findQuizStudents = (req, res) => {
  const id = req.params.id;
  quizModel
    .findById(id)
    .then((quiz) => {
      if (!quiz)
        res.status(404).json({ message: "No Quiz found with id " + id });
      else {
        // find teacher
        db.studentModel
          .find({
            _id: { $in: quiz.students },
          })
          .then((students) => {
            res.json(students);
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
      res.status(500).json({ message: "Error retrieving Quiz with id=" + id });
    });
};
exports.findQuizQuestions = (req, res) => {
  const id = req.params.id;
  quizModel
    .findById(id)
    .then((quiz) => {
      if (!quiz)
        res.status(404).json({ message: "No Quiz found with id " + id });
      else {
        // find teacher
        db.questionModel
          .find({
            _id: { $in: quiz.questions },
          })
          .then((questions) => {
            res.json(questions);
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
      res.status(500).json({ message: "Error retrieving Quiz with id=" + id });
    });
};
exports.addQuizQuestions = (req, res) => {
  const id = req.params.id;
  quizModel
    .findById(id)
    .then((quiz) => {
      if (!quiz)
        res.status(404).json({ message: "No Quiz found with id " + id });
      else {
        // find teacher
        db.teacherModel
          .findById(quiz.teacher)
          .then((teacher) => {
            res.json(teacher);
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error retrieving Teacher with id=" + quiz.teacher,
            });
          });
        // add teacher
        // res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving Quiz with id=" + id });
    });
};
exports.associateTeacherToQuiz = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data can not be empty!",
    });
  }
  // TODO: __
  // validate student
  const id = req.params.id;
  quizModel
    .findByIdAndUpdate(
      id,
      { teacher: req.body.teacherID },
      { useFindAndModify: false }
    )
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Quiz with id=${id}. Maybe Quiz was not found!`,
        });
      } else res.json({ message: "Quiz was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error updating Quiz with id=" + id + ". Maybe Quiz was not found!",
      });
    });
};
exports.addStudentToQuiz = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data can not be empty!",
    });
  }
  // TODO: __
  // validate student
  const id = req.params.id;
  quizModel
    .findByIdAndUpdate(
      id,
      { $addToSet: { students: req.body.studentID } },
      { useFindAndModify: false }
    )
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Quiz with id=${id}. Maybe Quiz was not found!`,
        });
      } else res.json({ message: "Quiz was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error updating Quiz with id=" + id + ". Maybe Quiz was not found!",
      });
    });
};
exports.addQuestionToQuiz = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data can not be empty!",
    });
  }
  // TODO: __
  // validate student
  const id = req.params.id;
  quizModel
    .findByIdAndUpdate(
      id,
      { $addToSet: { questions: req.body.questionID } },
      { useFindAndModify: false }
    )
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Quiz with id=${id}. Maybe Quiz was not found!`,
        });
      } else res.json({ message: "Quiz was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error updating Quiz with id=" + id + ". Maybe Quiz was not found!",
      });
    });
};

exports.delteTeacherFromQuiz = (req, res) => {
  const id = req.params.id;
  quizModel
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).json({ message: "No Quiz found with id " + id });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving Quiz with id=" + id });
    });
};
exports.deleteStudentFromQuiz = (req, res) => {
  const id = req.params.id;
  quizModel
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).json({ message: "No Quiz found with id " + id });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving Quiz with id=" + id });
    });
};
exports.deleteQuestionFromQuiz = (req, res) => {
  const id = req.params.id;
  quizModel
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).json({ message: "No Quiz found with id " + id });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving Quiz with id=" + id });
    });
};
