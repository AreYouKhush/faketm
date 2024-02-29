const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const cors = require('cors');
const userRouter = require('../src/api/routes/user');

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Connected");
});

app.use("/user", userRouter)

module.exports = app;
