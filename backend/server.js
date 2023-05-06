const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const postsRoute = require("./app/routes/post.route");
const authRoute = require("./app/routes/auth.route");
app.use("/api/posts", postsRoute);
app.use("/api/auth", authRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const message = error.message;
  res.status(status).json({
    message: message,
  });
});

if (process.env.NODE_ENV === "production") {
  // Static Folder
  app.use(express.static(__dirname + "/public"));

  //Handle SPA
  app.use(/.*/, (req, res, next) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

const PORT = process.env.PORT || 3000;

mongoose
  .connect('mongodb://127.0.0.1:27017/blog-app')
  .then(() => {
      console.log("Connected to the database!");
  })
  .catch((error) => {
      console.log("Cannot connect to the database!", error);
      process.exit();
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});