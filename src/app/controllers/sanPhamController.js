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
    data.image = "data:image/jpeg;base64,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";
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
