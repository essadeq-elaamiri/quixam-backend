# quixam-backend

**endpoints** (deprecated)

```
/***********************************************************************
 * enpoints --routes--
 * /api/
 *      |-----/quizzes #list all
 *              |-----/teacher/id #list all trachers of a teacher
 *              |-----/student/id #list all trachers of a teacher
 *              |-----/id #show one
 *                      |-----/delete
 *                      |-----/edit
 *      |-----/teachers #list all
 *              |-----/id #show one
 *                      |-----/delete
 *                      |-----/edit
 *      |-----/students #list all
 *              |-----/quiz/id #list all students subscibed in a quiz
 *              |-----/id #show one
 *                      |-----/delete
 *                      |-----/edit
 *                      |-----/edit
 *      |-----/questions #list all
 *              |-----/quiz/id #list all questions of a quiz
 *              |-----/id #show one
 *                      |-----/delete
 *                      |-----/edit
 ********************************************************************
 */

```

---

**Run server**
After clonning the repository, and from inside run:
`npm start-app` // start server

**Endpoints**:

- /api/

  - teachers
    - router.post("/", teacherController.create);
    - router.get("/", teacherController.findAll);
    - router.get("/:id", teacherController.findOne);
    - router.put("/:id", teacherController.update);
    - router.delete("/:id", teacherController.delete);
    - router.delete("/", teacherController.deleteAll);
    - router.get("/:id/quizes", teacherController.findTeacherQuizes);
    - router.post("/:id/quiz", teacherController.addQuizToTeacher);
    - router.delete("/:id/quiz/:quizID", teacherController.deleteQuizFromTeacher);
  - students
    - router.post("/", studentController.create)
    - router.get("/", studentController.findAll);
    - router.get("/:id", studentController.findOne);
    - router.put("/:id", studentController.update);
    - router.delete("/:id", studentController.delete);
    - router.delete("/", studentController.deleteAll);
    - router.get("/:id/quizes", studentController.findStudentQuizes);
    - router.post("/:id/quiz", studentController.addQuizToStudent);
    - router.delete("/:id/quiz/:quizID", studentController.deleteQuizFromStudent);
  - answers
    - router.post("/", answerController.create);
    - router.get("/", answerController.findAll);
    - router.get("/:id", answerController.findOne);
    - router.put("/:id", answerController.update);
    - router.delete("/:id", answerController.delete);
    - router.delete("/", answerController.deleteAll);
    - router.get("/:id/question", answerController.findAnswerQuestion);
    - router.post("/:id/question", answerController.associateQuestionToAnswer);
    - router.delete("/:id/question/:questionID",answerController.deleteQuestionFromAnswer);
  - questions
    - router.post("/", questionController.create);
    - router.get("/", questionController.findAll);
    - router.get("/:id", questionController.findOne);
    - router.put("/:id", questionController.update);
    - router.delete("/:id", questionController.delete);
    - router.delete("/", questionController.deleteAll);
    - router.get("/:id/quiz", questionController.findQuestionQuiz); // tested
    - router.get("/:id/answers", questionController.findQuestionAnswers); // tested
    - router.post("/:id/quiz", questionController.associateQuizToQuestion); // tested
    - router.post("/:id/answer", questionController.addAnswerToQuestion); // tested
    - router.delete("/:id/quiz/:quizID", questionController.deleteQuizFromQuestion);
    - router.delete("/:id/answer/:answerID",questionController.deleteAnswerFromQuestion);
  - quizes
    - router.post("/", quizController.create);
    - router.get("/", quizController.findAll);
    - router.get("/:id", quizController.findOne);
    - router.put("/:id", quizController.update);
    - router.delete("/:id", quizController.delete);
    - router.delete("/", quizController.deleteAll);
    - router.get("/:id/teacher", quizController.findQuizTeacher); // tested
    - router.get("/:id/students", quizController.findQuizStudents); // tested
    - router.get("/:id/questions", quizController.findQuizQuestions); // tested
    - router.delete("/:id/teacher/:teacherID",quizController.associateTeacherToQuiz);
    - router.delete("/:id/student/:studentID", quizController.addStudentToQuiz);
    - router.delete("/:id/question/:questionID", quizController.addQuestionToQuiz);
    - router.post("/:id/teacher", quizController.associateTeacherToQuiz); // tested
    - router.post("/:id/student", quizController.addStudentToQuiz); // tested
    - router.post("/:id/question", quizController.addQuestionToQuiz); // tested
  - student_quiz \*new
    - router.post("/", studentQuizController.setQuizToStudent);
    - router.get("/", studentQuizController.findAll);
    - router.get("/:id", studentQuizController.findOne);
    - router.put("/:id", studentQuizController.update);
    - router.delete("/:id", studentQuizController.delete);
    - router.delete("/", studentQuizController.deleteAll);

---

to do

- [x] associations
- [ ] JWT authentication
- [ ] more validation before adding associated models

~~Ok, just realized that no need for student_quiz model, we ca just add the attributes to the quizes list in student model~~ `overshit`

- [x] Add student_quiz model
- [x] Handle student_quiz Controller
- [x] Handling student_quiz Router (basic).
- [ ] test routes
