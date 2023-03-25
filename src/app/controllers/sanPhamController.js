const Product = require("../models/Product");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class sanPhamController {
  goToDetail(req, res) {
    res.render("sanPhamDetail");
  }
  createProduct(req, res) {
    res.render("themSanPham");
  }
  index(req, res, next) {
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
