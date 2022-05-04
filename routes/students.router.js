module.exports = (app) => {
  const studentController = require("../controllers/student.controller");
  var router = require("express").Router();
  // Create a new Student
  router.post("/", studentController.create);
  // Retrieve all Students
  router.get("/", studentController.findAll);
  // Retrieve a single Student with id
  router.get("/:id", studentController.findOne);
  // Update a Student with id
  router.put("/:id", studentController.update);
  // Delete a Student with id
  router.delete("/:id", studentController.delete);
  // Create a new Student
  router.delete("/", studentController.deleteAll);
  app.use("/api/students", router);
};

// TODO:
/*
    /quizStudents/:quizID // students have the access to this quiz
   
*/
