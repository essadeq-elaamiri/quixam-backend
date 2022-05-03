module.exports = (app) => {
  const quizController = require("../controllers/quiz.controller");
  var router = require("express").Router();
  // Create a new Quiz
  router.post("/", quizes.create);
  // Retrieve all Quizs
  router.get("/", quizes.findAll);
  // Retrieve a single Quiz with id
  router.get("/:id", quizes.findOne);
  // Update a Quiz with id
  router.put("/:id", quizes.update);
  // Delete a Quiz with id
  router.delete("/:id", quizes.delete);
  // Create a new Quiz
  router.delete("/", quizes.deleteAll);
  app.use("/api/quizes", router);
};

// TODO:
/*
    /teacherQuizes/:teacherID // quizez of the teacher
    /studentsQuizes/:students // quizez of the student
   
*/
