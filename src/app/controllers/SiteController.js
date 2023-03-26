class SiteController {
  login(req, res) {
    res.render("dangnhap");
  }
  register(req, res) {
    res.render("dangKi");
  }
}

module.exports = new SiteController();
