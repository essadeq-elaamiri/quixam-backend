module.exports = (mongoose) => {
  // function recives mongoose
  const answer = mongoose.model(
    "answer",
    mongoose.Schema(
      {
        content: {
          type: String,
          required: [true, "Answer must have a content !"],
        },
        isTrue: {
          type: Boolean,
          required: true,
        },
      },
      { timestamps: true }
    )
  );

  return answer;
};
