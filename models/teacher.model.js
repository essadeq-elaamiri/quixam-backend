module.exports = (mongoose) => {
  // function
  const teacher = mongoose.model(
    "teacher",
    mongoose.Schema(
      {
        firstname: {
          type: String,
          required: true,
        },
        lastname: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          validate: {
            validator: function (value) {
              return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                value
              );
            },
            message: (props) => `${props.value} is not a valid email!`,
          },
          required: [true, "Your email is required"],
        },
        password: {
          type: String,
          validate: {
            validator: function (value) {
              return value.length > 3;
            },
            message: (props) => `Password must be longer than 3 characters !`,
          },
          required: [true, "Password is required"],
        },
      },
      { timestamps: true }
    )
  );

  return teacher;
};
