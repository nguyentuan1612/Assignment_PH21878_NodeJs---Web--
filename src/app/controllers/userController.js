const User = require("../models/User");
const bcrypt = require("bcrypt");
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
        const checkPass =  await bcrypt.compare(password, data.password);
          if (data.email === email && checkPass === true) {
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
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.image = await store.get("nameImage");
    user
      .save()
      .then(() => {
        store.remove("nameImage");
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
      .catch((error) =>{
        console.log(error);
       return res.status(500).json({ message: error })
      });
  }
  index(req, res) {
    User.find().then((element) =>
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

  deleteUser(req,res,next){
    res.json(req.params.id);
      // User.deleteOne({_id:req.params.id}).then(() => {
      //   res.redirect("back");
      // }).catch((error) => next(error) );
  }
}

module.exports = new userController();
