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

### adding JWT

![jwt](https://www.bezkoder.com/wp-content/uploads/2019/10/in-depth-introduction-jwt-token-based-authentication.png)
![jwt_2](https://www.bezkoder.com/wp-content/uploads/2020/01/node-js-jwt-authentication-mysql-flow.png)

- `npm install jsonwebtoken`

```js
const jwt = require("jsonwebtoken");
...

```

[link](https://www.bezkoder.com/node-js-mongodb-auth-jwt/#Define_Routes)
