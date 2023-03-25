const productRouter = require("./sanPham.router");
const siteRouter = require("./site.router");
const userRouter = require("./user.route");

const route = (app) => {
  app.use("/sanPham", productRouter);
  app.use("/user", userRouter);
  app.use("/", siteRouter);

};

module.exports = route;
