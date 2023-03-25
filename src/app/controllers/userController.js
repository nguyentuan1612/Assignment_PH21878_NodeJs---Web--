const User = require("../models/User");
const { mutipleMongooseToObject, MongooseToObject } = require("../../util/mongoose");
class userController {
  createUser(req, res) {
    res.render("themNguoiDung");
  }
  updateUser(req, res) {
    res.render("suaNguoiDung");
  }
  async login(req, res, next) {
    const { email, password } = await req.body;
    User.findOne({ email: email }).then(async (response) => {
      const data = await MongooseToObject(response);
      if (data) {
        if (data.email === email && data.password === password) {
          return res.status(200).json({ message: 'success' ,data : data})
        } else {
          return res.status(404).json({ message: 'fail' })
        }
      }
    }).catch((error) => {
      res.status(404).json({ message: "server error" })
    })

  }
  store(req, res, next) {
    const dataUser = req.body;
    dataUser.image = "https://ibiettuot.com/wp-content/uploads/2021/10/avatar-mac-dinh.png";
    const user = new User(dataUser);
    user.save()
      .then(() => {
        return res.status(201).json({ message: "created" })
      })
      .catch((error) => res.status(500).json({ message: "error" }));

    // res.json(dataUser)
  }
  // createUser(req,res){
  //     res.render('xoaNguoi');
  // }
  index(req, res) {
    User.find({}).then((element) =>
      res.render("danhSachNguoiDung", {
        element: mutipleMongooseToObject(element),
      })
    );
  }
}

module.exports = new userController();
