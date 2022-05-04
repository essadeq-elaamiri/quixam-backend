module.exports = (mongoose) => {
  // function recives mongoose
  const quiz = mongoose.model(
    "quiz",
    mongoose.Schema(
      {
        title: {
          type: String,
          required: [true, "Quiz must have a title !"],
        },
        description: {
          type: String,
        },
        deadLine: {
          type: Date,
        },
        time: {
          type: String,
        },
        questions: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question",
          },
        ],

        teacher: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "teacher",
        },

        students: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "student",
          },
        ],
      },
      { timestamps: true } // auto createdAt and updatedAt
    )
  );

  return quiz;
};
