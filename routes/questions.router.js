module.exports = (app) => {
  const questionController = require("../controllers/question.controller");
  var router = require("express").Router();
  // Create a new Question
  router.post("/", questionController.create);
  // Retrieve all Questions
  router.get("/", questionController.findAll);
  // Retrieve a single Question with id
  router.get("/:id", questionController.findOne);
  // Update a Question with id
  router.put("/:id", questionController.update);
  // Delete a Question with id
  router.delete("/:id", questionController.delete);
  // Create a new Question
  router.delete("/", questionController.deleteAll);
  app.use("/api/questions", router);
};

// TODO:
/*
    /quizQuestions/:quizID // 
   
*/
