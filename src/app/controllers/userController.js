const User = require("../models/User");
const {
  mutipleMongooseToObject,
  MongooseToObject,
} = require("../../util/mongoose");
const store = require("store");

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
          if (data.email === email && data.password === password) {
            store.set("nameAdminLogin", data.name);
            store.set("idAdminLogin", data._id);
            store.set("admin", data.admin);
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
    user.image = await store.get("nameImage");
    user
      .save()
      .then(() => {
        store.remove("nameImage");
        return res.status(201).json({ message: "created" });
      })
      .catch((error) => res.status(500).json({ message: error }));
  }
  storeRegister(req, res) {
    const dataUser = req.body;
    dataUser.image =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzPprM_CZdb09M5rjPup96Hzjn5jGWYgX6xQimH2Cdsg&s";
    const user = new User(dataUser);
    user.admin = false;
    user
      .save()
      .then(() => {
        return res.status(201).json({ message: "created" });
      })
      .catch((error) => res.status(500).json({ message: error }));
  }
  index(req, res) {
    User.find({}).then((element) =>
      res.render("danhSachNguoiDung", {
        element: mutipleMongooseToObject(element),
      })
    );
  }
  async account(req, res, next) {
    const id = await store.get("idAdminLogin");
    const admin = await store.get("admin");

    User.findById({ _id: id })
      .then((element) => {
        res.render("taiKhoan", {
          element: MongooseToObject(element),
          admin: admin,
        });
      })
      .catch((error) => next(error));
  }

  updateAccount(req, res, next) {}

  async updateUser(req,res,next){
    const data = await req.body.name;
    const img = await store.get("nameImage");
    let admin;
    if(await req.body.admin === "admin"){
      admin = true;
    }else{
      admin = false;
    }
    User.updateOne({_id:req.params.id},{name:data,image:img,admin:admin}).then(() => {
      store.remove("nameImage");
      res.redirect("/user")
    }).catch((error) => res.redirect("/user/userDetail/"+req.params.id))
  }
}

module.exports = new userController();
