module.exports = (app) => {
  const studentController = require("../controllers/student.controller");
  var router = require("express").Router();
  // Create a new Student
  router.post("/", students.create);
  // Retrieve all Students
  router.get("/", students.findAll);
  // Retrieve a single Student with id
  router.get("/:id", students.findOne);
  // Update a Student with id
  router.put("/:id", students.update);
  // Delete a Student with id
  router.delete("/:id", students.delete);
  // Create a new Student
  router.delete("/", students.deleteAll);
  app.use("/api/students", router);
};
