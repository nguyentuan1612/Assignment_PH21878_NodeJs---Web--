const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const app = express();
const route = require("./routes/index.route");
const db = require('./app/config/db/index');
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require('dotenv').config();
const session = require("express-session")
app.use(passport.initialize());

app.listen(3000, (req, res) => console.log("3000 OK"));
app.use(cookieParser());

//connect database;
db.connect(); 

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    helpers: {
      "select":(data,value) => { return data === value ? "selected" : ""},
      "admin":(data) => { return data === true ? "selected" : ""}
    }
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../uploads")));

// console.log(path.join(__dirname, "../uploads/"));

// app.use(express.static(path.join(__dirname, "resource", "pages", "assets")));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

app.use(methodOverride("_method"))

app.use(session({
  secret:'asdfsdfyug34ygfhuvf', // chuỗi ký tự đặc biệt để Session mã hóa, tự viết
  resave:false,
  saveUninitialized:false
}));

route(app);

// app.use((req, res, next) => {
//   res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//   next();
// });
