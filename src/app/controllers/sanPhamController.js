const Product = require("../models/Product");
const {
  mutipleMongooseToObject,
  MongooseToObject,
} = require("../../util/mongoose");
const store = require("store");

class sanPhamController {
  goToDetail(req, res, netx) {
    Product.findById({ _id: req.params.id })
      .then((element) =>
        res.render("sanPhamDetail", { element: MongooseToObject(element) })
      )
      .catch((error) => next(error));
  }
  createProduct(req, res) {
    res.render("themSanPham");
  }
  async store(req, res, next) {
    const data = await req.body;
    const product = new Product(data);
    product.image = await store.get("nameImage");

    product
      .save()
      .then(() => res.status(201).json({ message: "created" }))
      .catch((error) => res.status(500).json({ message: "error" }));
  }
  async index(req, res, next) {
    const name = await store.get("nameAdminLogin");
    const admin = await store.get("admin");
    Product.find({})
      .then((element) =>
        res.render("danhSachSanPham", {
          element: mutipleMongooseToObject(element),
          name: name,
          admin: admin,
        })
      )
      .catch((error) => next(error));
  }
}
module.exports = new sanPhamController();
