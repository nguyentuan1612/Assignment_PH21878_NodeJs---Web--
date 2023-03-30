const express = require('express');
const router = express.Router();

const sanPhamController = require('../app/controllers/sanPhamController');
const uploadController = require('../app/controllers/uploadController');


router.get('/sanPhamDetail',sanPhamController.goToDetail);
router.get('/addProduct',sanPhamController.createProduct);
router.post('/addProduct/store',uploadController.upload.single("imageProduct"),sanPhamController.store);
router.get('/',sanPhamController.index);


module.exports = router;