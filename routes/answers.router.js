module.exports = (app) => {
  const answerController = require("../controllers/answer.controller");
  var router = require("express").Router();
  // Create a new Answer
  router.post("/", answerController.create);
  // Retrieve all Answers
  router.get("/", answerController.findAll);
  // Retrieve a single Answer with id
  router.get("/:id", answerController.findOne);
  // Update a Answer with id
  router.put("/:id", answerController.update);
  // Delete a Answer with id
  router.delete("/:id", answerController.delete);
  // Create a new Answer
  router.delete("/", answerController.deleteAll);
  app.use("/api/answers", router);
};

// TODO:
/*
    /questionAnswers/:questionID // 
   
*/
