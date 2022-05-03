const db = require("../models/main");

const quizModel = db.quizModel;

// Create and Save a new Quiz
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).json({ message: "Content can not be empty!" });
    return;
  }
  // TODO: Other validation
  // Create a quiz
  const quiz = new quizModel({
    title: req.body.title,
    description: req.body.description,
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
// Retrieve all Quizs from the database.
exports.findAll = (req, res) => {
  quizModel
    .findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving quizes.",
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
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};
// Update a Quiz by the id in the request
exports.update = (req, res) => {};
// Delete a Quiz with the specified id in the request
exports.delete = (req, res) => {};
// Delete all Quizs from the database.
exports.deleteAll = (req, res) => {};
// Find all quiz Quizs
exports.findStudentQuizes = (req, res) => {};
exports.findTeacherQuizes = (req, res) => {};
