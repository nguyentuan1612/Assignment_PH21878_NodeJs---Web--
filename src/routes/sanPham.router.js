const express = require('express');
const router = express.Router();

const sanPhamController = require('../app/controllers/sanPhamController');
const uploadController = require('../app/controllers/uploadController');
const Auth = require("../app/config/middleware/middleware")

router.get('/sanPhamDetail/:id/edit',Auth.auth_session,sanPhamController.goToDetail);
router.get('/addProduct',Auth.auth_session,sanPhamController.createProduct);
router.post('/addProduct/store',Auth.auth_session,uploadController.upload.single("imageProduct"),sanPhamController.store);
router.put('/:id/update',Auth.auth_session,uploadController.upload.single("imageProduct"),sanPhamController.updateProduct);
router.delete('/:id/delete',Auth.auth_session,uploadController.upload.single("imageProduct"),sanPhamController.deleteProduct);
router.get('/',Auth.auth_session,sanPhamController.index);


module.exports = router;