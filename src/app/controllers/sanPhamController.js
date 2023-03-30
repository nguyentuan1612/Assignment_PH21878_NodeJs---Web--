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
async store(req, res, next) {
   
      const data = await req.body;
      const product = new Product(data);
      product.image = await store.get('nameImage');
      
      product
        .save()
        .then(() => res.status(201).json({message:"created"}))
        .catch((error) => res.status(500).json({message:"error"}));
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
