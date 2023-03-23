const productRouter = require("./sanPham.router");
const siteRouter = require("./site.router");

const route = (app) => {
  app.use("/sanPham", productRouter);

  app.use("/", siteRouter);

};

module.exports = route;
