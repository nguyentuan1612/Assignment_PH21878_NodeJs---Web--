const Product = require("../models/Product");
const {
  mutipleMongooseToObject,
  MongooseToObject,
} = require("../../util/mongoose");
const store = require("store");

class sanPhamController {
  async goToDetail(req, res, next) {
    const user = await req.user;

    Product.findById({ _id: req.params.id })
      .then((element) =>
        res.render("sanPhamDetail", {
          element: MongooseToObject(element),
          name: user.name,
          admin: user.admin,
        })
      )
      .catch((error) => next(error));
  }
async  createProduct(req, res) {
    const name = await req.user.name;
    res.render("themSanPham",{name:name});
  }
  async store(req, res, next) {
    const data = await req.body;
    const product = new Product(data);
    product.image = req.file.originalname;
    product
      .save()
      .then(() => {
        res.redirect("/sanPham");
      })
      .catch((error) => next(error));
  }

  async index(req, res, next) {
    const user = await req.user;
    console.log("user sp : " + user);
    Product.find({})
      .then((element) =>
        res.render("danhSachSanPham", {
          element: mutipleMongooseToObject(element),
          name: user.name,
          admin: user.admin,
        })
      )
      .catch((error) => next(error));
  }

  async updateProduct(req, res, next) {
    const dataForm = await req.body;
    if(req.file){
      dataForm.image = await req.file.originalname;
    }
    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        store.remove("nameImage");
        res.redirect("/sanPham");
      })
      .catch((error) => next(error));
  }

  deleteProduct(req, res, next) {
    Product.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch((error) => next(error));
  }
}

module.exports = new sanPhamController();
