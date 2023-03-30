const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const app = express();
const route = require("./routes/index.route");
const db = require('./app/config/db/index');
const fs = require("fs");
const dir = "uploads"
let nameImg;
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, 0744);
}

app.listen(3000, (req, res) => console.log("3000 OK"));

//connect database;
db.connect(); 

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../uploads/")));

console.log(path.join(__dirname, "../uploads/"));

// app.use(express.static(path.join(__dirname, "resource", "pages", "assets")));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

route(app);

