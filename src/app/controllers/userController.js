const User = require("../models/User");
const KEY = "asdfsdfyug34ygfhuvf"
const bcrypt = require("bcrypt");
const {
  mutipleMongooseToObject,
  MongooseToObject,
} = require("../../util/mongoose");
const store = require("store");
const jwt = require("jsonwebtoken");
const KEYSC = require("../config/env/env")
class userController {
  async createUser(req, res) {
    const name = await req.user.name;
    res.render("themNguoiDung",{name:name});
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
            const token = jwt.sign({ id: data._id }, KEY, { expiresIn: "1h" });
            // res.cookie("jwt", token, { maxAge: 3600000, httpOnly: true ,sameSite: "strict" });
            req.session.token = { token: token, id: data._id };
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
    if(req.file){
      user.image = req.file.originalname;
    }else{
      user.image =  "anhdaidien.png"
    }
    user
      .save()
      .then(() => {
        return res.status(201).json({ message: "created" });
      })
      .catch((error) => res.status(500).json({ message: error }));
  }
  async storeRegister(req, res) {
    const dataUser =await req.body;
    dataUser.image =
    "anhdaidien.png";
    const user =  new User(dataUser);
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
    const user = await req.user;
    const idUser = await user._id;
    User.find({ _id: { $ne: idUser } }).then( async (element) =>
      res.render("danhSachNguoiDung", {
        element: mutipleMongooseToObject(element),
        name: await req.user.name
      })
    );
  }
  async account(req, res, next) {
    const user = await req.user;
    res.render("taiKhoan", { user: user });
  }

  async updateAccount(req, res, next) {
    const idUser = await req.params.id;
    console.log(req.user);
    const data = await req.body;
    data.image = req.body.imageUser;
    if(req.file){
     data.image =  await req.file.originalname;
    }else{
      data.image = req.body.imageUser;
    }
    // console.log(data);
    User.updateOne({ _id: idUser }, data)
      .then(() => res.redirect("back"))
      .catch((error) => res.send(error));
  }

  async updateUser(req, res, next) {
    const data = await req.body.name;
    let img;
    if(req.file){
       img = await req.file.originalname;
    }
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
    if(req.session != null )
    req.session.destroy(  function(){
       console.log("Đăng xuất thành công")
      res.redirect('/login');
   });

    // res.clearCookie("jwt");
    // res.redirect("/login");
    // res.end();
  }

 async updatePasssword(req,res,next){
    const user = await req.user;
    User.findById({ _id: user._id }).then((element) =>
      res.render("doimatkhau", {
        element: MongooseToObject(element),
      })
    );
  }
  async updatePassswordPut(req,res,next){
    const password = await req.body.password;
    const passwordN = await req.body.passwordN;
    const id = await req.params.id;

    User.findById(id).then(async (data) => {
      const checkPass = await bcrypt.compare(password, data.password);
      if(checkPass){
        const salt = await bcrypt.genSalt(10);
       const passwordNew = await bcrypt.hash(passwordN, salt);
        
        User.updateOne({_id:id},{password : passwordNew}).then(() =>{
          req.session.destroy();
          return res.status(200).json(({msg:"done"}))
        }).catch((error) => {
          return res.status(500).json(({msg:"error"}))
        })
      }else{
        return res.status(404).json(({msg:"mat khau k chinh xac"}))
      }
    })
  }
}

module.exports = new userController();
