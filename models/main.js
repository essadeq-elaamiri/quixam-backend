const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");

// ??
//mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;

// models
db.teacherModel = require("./teacher.model");
db.questionModel = require("./question.model");
db.answerModel = require("./answer.model");
db.quizModel = require("./quiz.model");
db.studentModel = require("./student.model");

module.exports = db;
