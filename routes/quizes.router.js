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
  // manage associations
  router.get("/:id/teacher", quizController.findQuizTeacher); // tested
  router.get("/:id/students", quizController.findQuizStudents); // tested
  router.get("/:id/questions", quizController.findQuizQuestions); // tested

  // adding
  router.post("/:id/teacher", quizController.associateTeacherToQuiz); // tested
  router.post("/:id/student", quizController.addStudentToQuiz); // tested
  router.post("/:id/question", quizController.addQuestionToQuiz); // tested

  router.delete(
    "/:id/teacher/:teacherID",
    quizController.associateTeacherToQuiz
  );
  router.delete("/:id/student/:studentID", quizController.addStudentToQuiz);
  router.delete("/:id/question/:questionID", quizController.addQuestionToQuiz);

  app.use("/api/quizes", router);
};
