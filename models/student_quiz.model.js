module.exports = (mongoose) => {
  // function recives mongoose
  const student_quiz = mongoose.model(
    "student_quiz",
    mongoose.Schema(
      {
        passedAt: {
          type: Date,
          required: [true, "Must set quiz passing date!"],
        },
        duration: {
          type: Number,
          require: false, // just to not be hard to deal with
        },
        score: {
          type: Number,
          require: [true, "A quiz passed? without score? seriously?"],
        },
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "student",
        },
        quiz: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "quiz",
        },
      },
      { timestamps: true } // auto createdAt and updatedAt
    )
  );

  return student_quiz;
};
