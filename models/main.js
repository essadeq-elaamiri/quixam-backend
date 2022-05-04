const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");

// ??
//mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;

// models
db.teacherModel = require("./teacher.model")(mongoose);
db.questionModel = require("./question.model")(mongoose);
db.answerModel = require("./answer.model")(mongoose);
db.quizModel = require("./quiz.model")(mongoose);
db.studentModel = require("./student.model")(mongoose);

module.exports = db;
