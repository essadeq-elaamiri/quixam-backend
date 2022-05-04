const db = require("../models/main");

const answerModel = db.answerModel;

// Create and Save a new Answer
exports.create = (req, res) => {
  // Validate request

  // TODO: Other validation
  // Create a answer
  const answer = new answerModel({
    content: req.body.content,
    isTrue: req.body.isTrue ? req.body.isTrue : false,
  });
  // Save answer to the database
  answer
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Answer.",
      });
    });
};
// Retrieve all Answers from the database.
exports.findAll = (req, res) => {
  let page = req.query.page ? req.query.page : 0;
  let size = req.query.size ? req.query.size : 5;
  answerModel
    .find({}, null, { skip: page * size, limit: size })
    .then((data) => {
      answerModel
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
          "Some error occurred while retrieving the Answers list.",
      });
    });
};
// Find a single Answer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  answerModel
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).json({ message: "No Answer found with id " + id });
      else res.json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error retrieving Answer with id=" + id });
    });
};
// Update a Answer by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Update data can not be empty!",
    });
  }
  const id = req.params.id;
  answerModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Answer with id=${id}. Maybe Answer was not found!`,
        });
      } else res.json({ message: "Answer was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error updating Answer with id=" +
          id +
          ". Maybe Answer was not found!",
      });
    });
};
// Delete a Answer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  answerModel
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete Answer with id=${id}. Maybe it was not found!`,
        });
      } else {
        res.json({
          message: "Answer was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Could not delete Answer with id=" + id + ". Maybe it was not found!",
      });
    });
};
// Delete all Answers from the database.
exports.deleteAll = (req, res) => {
  answerModel
    .deleteMany({})
    .then((data) => {
      res.json({
        message: `${data.deletedCount} Answer records were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while removing all records.",
      });
    });
};
// Find all question Answers
exports.findQuestionAnswers = (req, res) => {};
