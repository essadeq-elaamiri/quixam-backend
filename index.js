// setup server
const express = require("express");
const cors = require("cors");
//cors provides Express middleware to enable CORS with various options.

// init express
const app = express();

const db = require("./models/main");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console
      .log("Database Connection error! details:[" + err + "]")
      .process.exit();
  });

//
var corsOptions = {
  origin: "http://localhost:8081",
};

//middleware
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// setup connection

// rourtes
app.get("/", (req, res) => {
  res.json({ message: "Geo" });
});

// TODO: using .env
// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
