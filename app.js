const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./config/database");

db.authenticate()
  .then(() => console.log("db connected"))
  .catch(err => console.log("Some error occured:" + err));

const app = express();

//middleware for handelbars
//we are setting handlebars as our template engine and setting default layout to main.js
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.send("Hello Project started");
});

/*Routes  */
app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`app has started at ${PORT}`));
