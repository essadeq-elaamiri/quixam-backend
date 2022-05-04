module.exports = (mongoose) => {
  // function recives mongoose
  const question = mongoose.model(
    "question",
    mongoose.Schema(
      {
        content: {
          type: String,
          required: [true, "Question must have a content !"],
        },
        score: {
          type: Number,
          required: true,
        },
        duration: {
          type: Number,
          min: -1, // if -1 no duration
        }, // seconds
        answers: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "answer",
          },
        ],
        quiz: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "quiz",
        },
      },
      { timestamps: true }
    )
  );

  return question;
};
