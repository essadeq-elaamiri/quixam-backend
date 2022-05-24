const db = require("../models/main");

const studentQuizModel = db.studentQuizModel;

exports.setQuizToStudent = (req, res) => {
  // I think it should process the passed quizes only,
  // creating model
  const inputData = new studentQuizModel({
    passedAt: req.body.passedAt,
    duration: req.body.duration,
    score: req.body.score,
    studentID: req.body.studentID,
    quizID: req.body.quizID,
  });

  // TODO: Now we should do some validations
  // is sudent exist
  db.studentModel
    .findById(inputData.studentID)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .json({ message: "No Student found with id " + inputData.studentID });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving Student with id=" + inputData.studentID,
      });
    });
  // is quiz exist
  db.quizModel
    .findById(quizID)
    .then((data) => {
      if (!data)
        res.status(404).json({ message: "No Quiz found with id " + quizID });
      else res.json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error retrieving Quiz with id=" + quizID });
    });
  //Ok now do create correspendance
  studentQuizModel
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message ||
          "Some error occurred while creating the Student_Quiz association object!",
      });
    });
};

exports.findAll = (req, res) => {
  let page = req.query.page ? req.query.page : 0;
  let size = req.query.size ? req.query.size : 5;
  studentQuizModel
    .find({}, null, { skip: page * size, limit: size })
    .then((data) => {
      studentQuizModel
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
  studentQuizModel
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).json({ message: "No studentQuiz found with id " + id });
      else res.json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error retrieving studentQuiz with id=" + id });
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
  studentQuizModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update studentQuiz with id=${id}. Maybe Quiz was not found!`,
        });
      } else res.json({ message: "studentQuiz was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error updating studentQuiz with id=" +
          id +
          ". Maybe studentQuiz was not found!",
      });
    });
};
// Delete a Quiz with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  studentQuizModel
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete studentQuiz with id=${id}. Maybe it was not found!`,
        });
      } else {
        res.json({
          message: "studentQuiz was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Could not delete studentQuiz with id=" +
          id +
          ". Maybe it was not found!",
      });
    });
};
// Delete all Quizes from the database.
exports.deleteAll = (req, res) => {
  studentQuizModel
    .deleteMany({})
    .then((data) => {
      res.json({
        message: `${data.deletedCount} studentQuiz records were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while removing all records.",
      });
    });
};

exports.getStudentQuizAssociationsByStudent = (req, res) => {
  const studentIDIn = req.params.studentID;
  let page = req.query.page ? req.query.page : 0;
  let size = req.query.size ? req.query.size : 5;
  studentQuizModel
    .find({ studentID: studentIDIn }, null, { skip: page * size, limit: size })
    .then((data) => {
      studentQuizModel
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
exports.getStudentQuizAssociationsByQuiz = (req, res) => {
  const quizIDIn = req.params.quizID;
  let page = req.query.page ? req.query.page : 0;
  let size = req.query.size ? req.query.size : 5;
  studentQuizModel
    .find({ quizID: quizIDIn }, null, { skip: page * size, limit: size })
    .then((data) => {
      studentQuizModel
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
