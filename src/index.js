const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "hbs");
app.set("public_html", path.join(__dirname, "public_html"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var error;
var info;
var result;
var num1;
var num2;
var disableInput = false;

app.get("/", (req, res) => {
  num1 = 0;
  num2 = 0;
  res.render("home", { num1, num2 });
});

app.post("/add", (req, res) => {
  info = "Add operation";
  num1 = parseFloat(req.body.num1);
  num2 = parseFloat(req.body.num2);

  if (isNaN(num1) || isNaN(num2)) {
    num1 = 0;
    num2 = 0;
    error = "Invalid input. Please provide values.";
    return res.render("home", { error, num1, num2 });
  }

  result = num1 + num2;
  res.render("home", { num1, num2, result, info });
});

app.post("/subtract", (req, res) => {
  info = "Subtract operation";
  num1 = parseFloat(req.body.num1);
  num2 = parseFloat(req.body.num2);

  if (isNaN(num1) || isNaN(num2)) {
    num1 = 0;
    num2 = 0;
    error = "Invalid input. Please provide numeric values.";
    return res.render("home", { error, num1, num2 });
  }

  result = num1 - num2;
  res.render("home", { num1, num2, result, info });
});

app.post("/multiply", (req, res) => {
  info = "Multiplication operation";
  num1 = parseFloat(req.body.num1);
  num2 = parseFloat(req.body.num2);

  if (isNaN(num1) || isNaN(num2)) {
    num1 = 0;
    num2 = 0;
    error = "Invalid input. Please provide numeric values.";
    return res.render("home", { error, num1, num2 });
  }

  result = num1 * num2;
  res.render("home", { num1, num2, result, info });
});

app.post("/divide", (req, res) => {
  info = "Division operation";
  num1 = parseFloat(req.body.num1);
  num2 = parseFloat(req.body.num2);

  if (num2 == 0) {
    num1 = 0;
    num2 = 0;

    error = "Cannot divide by 0";
    return res.render("home", { error, num1, num2 });
  } else if (isNaN(num1) || isNaN(num2)) {
    num1 = 0;
    num2 = 0;

    error = "Invalid input. Please provide numeric values.";
    return res.render("home", { error, num1, num2 });
  }

  result = num1 / num2;
  res.render("home", { num1, num2, result, info });
});

app.post("/exponentiate", (req, res) => {
  info = "Exponential operation";
  num1 = parseFloat(req.body.num1);
  num2 = parseFloat(req.body.num2);

  if (isNaN(num1) || isNaN(num2)) {
    num1 = 0;
    num2 = 0;
    error = "Invalid input. Please provide numeric values.";
    return res.render("home", { error, num1, num2 });
  }

  result = Math.pow(num1, num2);
  res.render("home", { num1, num2, result, info });
});

app.post("/reset", (req, res) => {
  error = "";
  result = "";
  num1 = 0;
  num2 = 0;
  disableInput = false;

  res.render("home", { num1, num2, error, result, disableInput });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
