// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const { errorHandler } = require("./middleware/error.middleware");
const connectToDb = require("./config/connectToDb");
// to access an images in the server from an url using static



// Create an express app
const app = express();
app.use(express.static('public'))
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

// Configure express app
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Connect to database
connectToDb();

// Routing

app.use("/admin", require("./routes/admin.route"));
app.use("/student", require("./routes/student.route"));
app.use("/teacher", require("./routes/teacher.route"));

app.use(errorHandler);

// Start our server
const port = process.env.PORT;
app.listen(port, () =>
  console.log("server is listening on port ", port, "...")
);
