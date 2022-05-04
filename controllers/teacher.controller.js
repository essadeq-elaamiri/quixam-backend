//https://www.bezkoder.com/node-express-mongodb-crud-rest-api/

const db = require("../models/main");
const teacherModel = db.teacherModel;

// create and save
exports.create = (req, res) => {
  // Validate request

  // TODO: Other validation
  // Create a teacher
  const teacher = new teacherModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  // Save teacher to the database
  teacher
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Teacher.",
      });
    });
};

// Retrieve all Teachers from the database.
exports.findAll = (req, res) => {
  let page = req.query.page ? req.query.page : 0;
  let size = req.query.size ? req.query.size : 5;
  teacherModel
    .find({}, null, { skip: page * size, limit: size })
    .then((data) => {
      teacherModel
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
          "Some error occurred while retrieving the Teachers list.",
      });
    });
};
// Find a single Teacher with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  teacherModel
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).json({ message: "No Teacher found with id " + id });
      else res.json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error retrieving Teacher with id=" + id });
    });
};
// Update a Teacher by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Update data can not be empty!",
    });
  }
  const id = req.params.id;
  teacherModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Teacher with id=${id}. Maybe Teacher was not found!`,
        });
      } else res.json({ message: "Teacher was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error updating Teacher with id=" +
          id +
          ". Maybe Teacher was not found!",
      });
    });
};
// Delete a Teacher with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  teacherModel
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete Teacher with id=${id}. Maybe it was not found!`,
        });
      } else {
        res.json({
          message: "Teacher was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Could not delete Teacher with id=" +
          id +
          ". Maybe it was not found!",
      });
    });
};
// Delete all Teachers from the database.
exports.deleteAll = (req, res) => {
  teacherModel
    .deleteMany({})
    .then((data) => {
      res.json({
        message: `${data.deletedCount} Teacher records were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while removing all records.",
      });
    });
};

exports.findTeacherQuizes = (req, res) => {
  const id = req.params.id;
  teacherModel
    .findById(id)
    .then((teacher) => {
      if (!teacher)
        res.status(404).json({ message: "No Teacher found with id " + id });
      else {
        // find teacher
        db.quizModel
          .find({
            _id: { $in: teacher.quizes },
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
        .json({ message: "Error retrieving Teacher with id=" + id });
    });
};
exports.addQuizToTeacher = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data can not be empty!",
    });
  }
  // TODO: __
  // validate student
  const id = req.params.id;
  teacherModel
    .findByIdAndUpdate(
      id,
      { $addToSet: { quizes: req.body.quizID } },
      { useFindAndModify: false }
    )
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Teacher with id=${id}. Maybe Teacher was not found!`,
        });
      } else res.json({ message: "Teacher was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error updating Teacher with id=" +
          id +
          ". Maybe Teacher was not found!",
      });
    });
};
exports.deleteQuizFromStudent = (req, res) => {};
