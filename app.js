const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./config/database");

db.authenticate()
  .then(() => console.log("db connected"))
  .catch(err => console.log("Some error occured:" + err));

const app = express();
app.get("/", (req, res) => {
  res.send("Hello Project started");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`app has started at ${PORT}`));
