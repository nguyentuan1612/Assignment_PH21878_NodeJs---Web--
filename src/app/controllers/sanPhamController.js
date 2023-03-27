const Product = require("../models/Product");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const store = require("store");

class sanPhamController {
  goToDetail(req, res) {
    res.render("sanPhamDetail");
  }
  createProduct(req, res) {
    res.render("themSanPham");
  }
  store(req, res, next) {
    const data = req.body;
    data.image = "";
    const product = new Product(data);
    product
      .save()
      .then(() => res.redirect("themSanPham"))
      .catch((error) => next(error));
  }
  index(req, res, next) {
    const name = store.get("nameAdminLogin");
    Product.find({})
      .then((element) =>
        res.render("danhSachSanPham", {
          element: mutipleMongooseToObject(element),
        })
      )
      .catch((error) => next(error));
  }
}
module.exports = new sanPhamController();
