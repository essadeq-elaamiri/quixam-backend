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
      },
      { timestamps: true }
    )
  );

  return quiz;
};
