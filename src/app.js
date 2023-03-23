const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const app = express();
const route = require("./routes/index.route");
app.listen(3000, (req, res) => console.log("3000 OK"));
app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
  })
);
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "resource", "pages", "assets")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

route(app);
