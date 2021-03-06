module.exports = (app) => {
  const teacherController = require("../controllers/teacher.controller");
  var router = require("express").Router();
  // Create a new Teacher
  router.post("/", teacherController.create);
  // Retrieve all Teachers
  router.get("/", teacherController.findAll);
  // Retrieve a single Teacher with id
  router.get("/:id", teacherController.findOne);
  // Update a Teacher with id
  router.put("/:id", teacherController.update);
  // Delete a Teacher with id
  router.delete("/:id", teacherController.delete);
  // Create a new Teacher
  router.delete("/", teacherController.deleteAll);

  router.get("/:id/quizes", teacherController.findTeacherQuizes);

  router.post("/:id/quiz", teacherController.addQuizToTeacher);

  router.delete("/:id/quiz/:quizID", teacherController.deleteQuizFromTeacher);

  app.use("/api/teachers", router);
};
