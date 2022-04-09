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
        duration: Number, // seconds
      },
      { timestamps: true }
    )
  );

  return question;
};
