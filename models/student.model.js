module.exports = (mongoose) => {
  // function recives mongoose
  const student = mongoose.model(
    "student",
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

  return student;
};
