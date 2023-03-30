const User = require("../models/User");
const {
  mutipleMongooseToObject,
  MongooseToObject,
} = require("../../util/mongoose");
const store = require('store')


class userController {
  createUser(req, res) {
    res.render("themNguoiDung");
  }
  updateUser(req, res) {
    res.render("suaNguoiDung");
  }
  async login(req, res, next) {
    const { email, password } = await req.body;
    User.findOne({ email: email })
      .then(async (response) => {
        const data = await MongooseToObject(response);
        if (data) {
          if (data.email === email && data.password === password) {
            store.set('nameAdminLogin', data.name)
            store.set('idAdminLogin', data._id)
            return res.status(200).json({ message: "success"});
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
        const user =  new User(dataUser);
        user.image = await store.get("nameImage");
        user.save().then(() => {
            return res.status(201).json({ message: "created" });
          })
          .catch((error) => res.status(500).json({ message: error }));
      

  }
  storeRegister(req,res){
    const dataUser = req.body;
    dataUser.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzPprM_CZdb09M5rjPup96Hzjn5jGWYgX6xQimH2Cdsg&s';
    const user = new User(dataUser);
    
      user.save().then(() => {
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
  account(req, res, next) {
    const id = store.get("idAdminLogin");
    User.findById({ _id: id })
      .then((element) => {
        res.render("taiKhoan", { element: MongooseToObject(element) });
      })
      .catch((error) => next(error));
  }
}

module.exports = new userController();