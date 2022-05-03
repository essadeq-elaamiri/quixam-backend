module.exports = (app) => {
  const answerController = require("../controllers/answer.controller");
  var router = require("express").Router();
  // Create a new Answer
  router.post("/", answers.create);
  // Retrieve all Answers
  router.get("/", answers.findAll);
  // Retrieve a single Answer with id
  router.get("/:id", answers.findOne);
  // Update a Answer with id
  router.put("/:id", answers.update);
  // Delete a Answer with id
  router.delete("/:id", answers.delete);
  // Create a new Answer
  router.delete("/", answers.deleteAll);
  app.use("/api/answers", router);
};
