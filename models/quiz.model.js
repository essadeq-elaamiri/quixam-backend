module.exports = (mongoose) => {
  // function recives mongoose
  const quiz = mongoose.model(
    "quiz",
    mongoose.Schema(
      {
        title: String,
        description: String,
        deadLine: Date,
        duration: String,
      },
      { timestamps: true }
    )
  );

  return quiz;
};
