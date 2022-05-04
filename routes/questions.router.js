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

  // manage associations
  router.get("/:id/quiz", questionController.findQuestionQuiz); // tested
  router.get("/:id/answers", questionController.findQuestionAnswers); // tested

  // adding
  router.post("/:id/quiz", questionController.associateQuizToQuestion); // tested
  router.post("/:id/answer", questionController.addAnswerToQuestion); // tested

  router.delete("/:id/quiz/:quizID", questionController.deleteQuizFromQuestion);
  router.delete(
    "/:id/answer/:answerID",
    questionController.deleteAnswerFromQuestion
  );

  app.use("/api/questions", router);
};

// TODO:
/*
    /quizQuestions/:quizID // 
   
*/
