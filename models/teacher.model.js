module.exports = (mongoose) => {
  // function
  const teacher = mongoose.model(
    "teacher",
    mongoose.Schema(
      {
        firstname: String,
        lastname: String,
        email: String,
        password: String,
      },
      { timestamps: true }
    )
  );

  return teacher;
};
