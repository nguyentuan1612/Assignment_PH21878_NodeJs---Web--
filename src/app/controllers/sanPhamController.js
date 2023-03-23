class sanPhamController {
  goToDetail(req, res) {
    res.render("sanPhamDetail");
  }

  index(req, res) {
    res.render("danhSachSanPham");
  }
}
module.exports = new sanPhamController();
