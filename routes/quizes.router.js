module.exports = (app) => {
  const quizController = require("../controllers/quiz.controller");
  var router = require("express").Router();
  // Create a new Quiz
  router.post("/", quizs.create);
  // Retrieve all Quizs
  router.get("/", quizs.findAll);
  // Retrieve a single Quiz with id
  router.get("/:id", quizs.findOne);
  // Update a Quiz with id
  router.put("/:id", quizs.update);
  // Delete a Quiz with id
  router.delete("/:id", quizs.delete);
  // Create a new Quiz
  router.delete("/", quizs.deleteAll);
  app.use("/api/quizs", router);
};
