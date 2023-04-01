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
    product.save().then(() =>{
      store.remove("nameImage")
      res.redirect('/sanPham')
    }).catch((error) => next(error))
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

  async updateProduct(req,res,next){
    const dataForm = await req.body;
    dataForm.image = await store.get("nameImage");
    Product.updateOne({_id:req.params.id},req.body).then(() => {
      store.remove("nameImage")
        res.redirect("/sanPham")
    }).catch((error) => next(error));
  }
}
module.exports = new sanPhamController();
