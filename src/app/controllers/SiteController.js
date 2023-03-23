class SiteController {
    login(req,res){
        res.render('dangnhap')
    }  
    register(req,res){
        res.render('dangki')
    }   

    addProduct(req,res){
        res.render('themSanPham')
    }  
    account(req,res){
        res.render('taiKhoan')
    } 
    listUser(req,res){
        res.render('danhSachNguoiDung')
    } 
    addUser(req,res){
        res.render('themNguoiDung')
    } 
     
}

module.exports = new SiteController();