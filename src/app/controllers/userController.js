const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  mutipleMongooseToObject,
  MongooseToObject,
} = require("../../util/mongoose");
const store = require("store");
const jwt = require("jsonwebtoken");
class userController {
  createUser(req, res) {
    res.render("themNguoiDung");
  }
  userDetail(req, res) {
    User.findById({ _id: req.params.id })
      .then((dataUser) =>
        res.render("nguoiDungChiTiet", { element: MongooseToObject(dataUser) })
      )
      .catch((error) => next(error));
  }
  async login(req, res, next) {
    const { email, password } = await req.body;
    User.findOne({ email: email })
      .then(async (response) => {
        const data = await MongooseToObject(response);
        if (data) {
          const checkPass = await bcrypt.compare(password, data.password);
          if (data.email === email && checkPass === true) {
            const token = jwt.sign({ id: data._id }, "asdfsdfyug34ygfhuvf");
            res.cookie("jwt", token, { maxAge: 3600000, httpOnly: true });
            return res.status(200).json({ message: "success" });
          } else {
            return res.status(404).json({ message: "fail" });
          }
        } else {
          res.status(404).json({ message: "server error" });
        }
      })
      .catch((error) => {
        res.status(404).json({ message: "server error" });
      });
  }
  async storeCreate(req, res, next) {
    const dataUser = await req.body;
    const user = new User(dataUser);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.image = req.file.originalname;
    user
      .save()
      .then(() => {
        return res.status(201).json({ message: "created" });
      })
      .catch((error) => res.status(500).json({ message: error }));
  }
  async storeRegister(req, res) {
    const dataUser = req.body;
    dataUser.image =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzPprM_CZdb09M5rjPup96Hzjn5jGWYgX6xQimH2Cdsg&s";
    const user = new User(dataUser);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.admin = false;
    user
      .save()
      .then(() => {
        return res.status(201).json({ message: "created" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: error });
      });
  }
  async index(req, res) {
    const user = await req.user.toObject();
    const idUser = await user._id;
    User.find({_id: {$ne: idUser}}).then((element) =>
      res.render("danhSachNguoiDung", {
        element: mutipleMongooseToObject(element),
      })
    );
  }
  async account(req, res, next) {
    const user = await req.user.toObject();
    res.render(
      "taiKhoan",
      { user: user },
    );
  }

  async updateAccount(req, res, next) {
    const idUser = await req.params.id;
    const data = await req.body;
    data.image = req.body.imageUser;
    // console.log(data);
    User.updateOne({_id:idUser},data).then(() => res.redirect("back")).catch((error) => res.send(error))
  }

  async updateUser(req, res, next) {
    const data = await req.body.name;
    const img = await req.file.originalname;
    let admin;
    if ((await req.body.admin) === "admin") {
      admin = true;
    } else {
      admin = false;
    }
    User.updateOne(
      { _id: req.params.id },
      { name: data, image: img, admin: admin }
    )
      .then(() => {
        res.redirect("/user");
      })
      .catch((error) => res.redirect("/user/userDetail/" + req.params.id));
  }

  deleteUser(req, res, next) {
    User.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch((error) => next(error));
  }

  logout(req, res, next) {
    res.clearCookie("jwt");
    res.redirect("/login");
    res.end();
  }
}

module.exports = new userController();
