const express = require('express');
const router = express.Router();

const sanPhamController = require('../app/controllers/sanPhamController');
const uploadController = require('../app/controllers/uploadController');
const passport = require("passport");
require('../app/config/passport/passport')(passport);

router.get('/sanPhamDetail/:id/edit',passport.authenticate('jwt',{session:false}),sanPhamController.goToDetail);
router.get('/addProduct',passport.authenticate('jwt',{session:false}),sanPhamController.createProduct);
router.post('/addProduct/store',passport.authenticate('jwt',{session:false}),uploadController.upload.single("imageProduct"),sanPhamController.store);
router.put('/:id/update',passport.authenticate('jwt',{session:false}),uploadController.upload.single("imageProduct"),sanPhamController.updateProduct);
router.delete('/:id/delete',passport.authenticate('jwt',{session:false}),uploadController.upload.single("imageProduct"),sanPhamController.deleteProduct);
router.get('/',passport.authenticate('jwt',{session:false}),sanPhamController.index);


module.exports = router;