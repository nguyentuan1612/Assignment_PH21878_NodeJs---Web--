class SiteController {
  login(req, res) {
    res.render("dangnhap");
  }
  register(req, res) {
    res.render("dangKi");
  }
  // addProduct(req, res) {
  //   res.render("themSanPham");
  // }
  account(req, res) {
    res.render("taiKhoan");
  }
  // listUser(req, res) {
  //   res.render("danhSachNguoiDung",{arr:arrUser});
  // }
  // addUser(req, res) {
  //   res.render("themNguoiDung");
  // }
}

module.exports = new SiteController();
