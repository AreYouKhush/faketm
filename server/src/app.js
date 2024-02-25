const express = require("express");
const app = express();
const userRouter = require('../src/api/routes/user');

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Connected");
});

app.use("/user", userRouter)

module.exports = app;
