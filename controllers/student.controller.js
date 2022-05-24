const db = require("../models/main");

const studentModel = db.studentModel;

// Create and Save a new Student
exports.create = (req, res) => {
  // Validate request

  // TODO: Other validation
  // Create a student
  const student = new studentModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  // Save student to the database
  student
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Student.",
      });
    });
};
// Retrieve all Students from the database.
exports.findAll = (req, res) => {
  let page = req.query.page ? req.query.page : 0;
  let size = req.query.size ? req.query.size : 5;
  studentModel
    .find({}, null, { skip: page * size, limit: size })
    .then((data) => {
      studentModel
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
          "Some error occurred while retrieving the Students list.",
      });
    });
};
// Find a single Student with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  studentModel
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).json({ message: "No Student found with id " + id });
      else res.json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error retrieving Student with id=" + id });
    });
};
// Update a Student by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Update data can not be empty!",
    });
  }
  const id = req.params.id;
  studentModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Student with id=${id}. Maybe Student was not found!`,
        });
      } else res.json({ message: "Student was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error updating Student with id=" +
          id +
          ". Maybe Student was not found!",
      });
    });
};
// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  studentModel
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete Student with id=${id}. Maybe it was not found!`,
        });
      } else {
        res.json({
          message: "Student was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Could not delete Student with id=" +
          id +
          ". Maybe it was not found!",
      });
    });
};
// Delete all Students from the database.
exports.deleteAll = (req, res) => {
  studentModel
    .deleteMany({})
    .then((data) => {
      res.json({
        message: `${data.deletedCount} Student records were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while removing all records.",
      });
    });
};
// Find all quiz Students
exports.findStudentQuizes = (req, res) => {
  const id = req.params.id;
  studentModel
    .findById(id)
    .then((student) => {
      if (!student)
        res.status(404).json({ message: "No Student found with id " + id });
      else {
        // find teacher
        db.quizModel
          .find({
            _id: { $in: student.quizes },
          })
          .then((quizes) => {
            res.json(quizes);
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
        .json({ message: "Error retrieving Student with id=" + id });
    });
};

exports.addQuizToStudent = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data can not be empty!",
    });
  }
  // TODO: __
  // validate student
  const id = req.params.id; // student ID
  // So we should retrieve the Quiz data from the body.

  studentModel
    .findByIdAndUpdate(
      id,
      { $addToSet: { quizes: req.body.quizID } },
      { useFindAndModify: false }
    )
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Student with id=${id}. Maybe Student was not found!`,
        });
      } else res.json({ message: "Student was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error updating Student with id=" +
          id +
          ". Maybe Student was not found!",
      });
    });
};
exports.deleteQuizFromStudent = (req, res) => {};
