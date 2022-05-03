const db = require("../models/main");

const quizModel = db.studentModel;

// Create and Save a new Quiz
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });
  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};
// Retrieve all Quizs from the database.
exports.findAll = (req, res) => {};
// Find a single Quiz with an id
exports.findOne = (req, res) => {};
// Update a Quiz by the id in the request
exports.update = (req, res) => {};
// Delete a Quiz with the specified id in the request
exports.delete = (req, res) => {};
// Delete all Quizs from the database.
exports.deleteAll = (req, res) => {};
// Find all quiz Quizs
exports.findStudentQuizes = (req, res) => {};
exports.findTeacherQuizes = (req, res) => {};
