module.exports = (app) => {
  const questionController = require("../controllers/question.controller");
  var router = require("express").Router();
  // Create a new Question
  router.post("/", questions.create);
  // Retrieve all Questions
  router.get("/", questions.findAll);
  // Retrieve a single Question with id
  router.get("/:id", questions.findOne);
  // Update a Question with id
  router.put("/:id", questions.update);
  // Delete a Question with id
  router.delete("/:id", questions.delete);
  // Create a new Question
  router.delete("/", questions.deleteAll);
  app.use("/api/questions", router);
};

// TODO:
/*
    /quizQuestions/:quizID // 
   
*/
