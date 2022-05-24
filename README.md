# quixam-backend

### endpoints

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

to do

- [x] associations
- [ ] JWT authentication
- [ ] more validation before adding associated models

~~Ok, just realized that no need for student_quiz model, we ca just add the attributes to the quizes list in student model~~ `overshit`

- [x] Add student_quiz model
- [x] Handle student_quiz Controller
- [x] Handling student_quiz Router (basic).
- [ ] test routes
