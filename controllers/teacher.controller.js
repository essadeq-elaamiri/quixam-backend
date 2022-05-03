//https://www.bezkoder.com/node-express-mongodb-crud-rest-api/

const db = require("../models/main");
const teacherModel = db.teacherModel;

// create and save
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

// Retrieve all Teachers from the database.
exports.findAll = (req, res) => {};
// Find a single Teacher with an id
exports.findOne = (req, res) => {};
// Update a Teacher by the id in the request
exports.update = (req, res) => {};
// Delete a Teacher with the specified id in the request
exports.delete = (req, res) => {};
// Delete all Teachers from the database.
exports.deleteAll = (req, res) => {};
