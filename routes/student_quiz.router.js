module.exports = (app) => {
  const studentQuizController = require("../controllers/student_quiz.controller");
  var router = require("express").Router();
  // Create  new
  router.post("/", studentQuizController.setQuizToStudent);
  // Retrieve all
  router.get("/", studentQuizController.findAll);
  // Retrieve a single  with id
  router.get("/:id", studentQuizController.findOne);
  // Update   with id
  router.put("/:id", studentQuizController.update);
  // Delete   with id
  router.delete("/:id", studentQuizController.delete);
  // Create  new
  router.delete("/", studentQuizController.deleteAll);

  router.get(
    "/student/:studentID",
    studentQuizController.getStudentQuizAssociationsByStudent
  );
  router.get(
    "/quiz/:quizID",
    studentQuizController.getStudentQuizAssociationsByQuiz
  );

  app.use("/api/student_quiz", router);
};

// TODO:
/*
    /quizStudents/:quizID // students have the access to this quiz
   
*/
