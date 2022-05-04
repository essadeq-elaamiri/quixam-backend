module.exports = (app) => {
  const quizController = require("../controllers/quiz.controller");
  var router = require("express").Router();
  // Create a new Quiz
  router.post("/", quizController.create);
  // Retrieve all Quizs
  router.get("/", quizController.findAll);
  // Retrieve a single Quiz with id
  router.get("/:id", quizController.findOne);
  // Update a Quiz with id
  router.put("/:id", quizController.update);
  // Delete a Quiz with id
  router.delete("/:id", quizController.delete);
  // Create a new Quiz
  router.delete("/", quizController.deleteAll);
  app.use("/api/quizes", router);
};

// TODO:
/*
    /teacherQuizes/:teacherID // quizez of the teacher
    /studentsQuizes/:students // quizez of the student
   
*/
