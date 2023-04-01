const express = require('express');
const router = express.Router();

const sanPhamController = require('../app/controllers/sanPhamController');
const uploadController = require('../app/controllers/uploadController');


router.get('/sanPhamDetail/:id/edit',sanPhamController.goToDetail);
router.get('/addProduct',sanPhamController.createProduct);
router.post('/addProduct/store',uploadController.upload.single("imageProduct"),sanPhamController.store);
router.put('/:id/update',uploadController.upload.single("imageProduct"),sanPhamController.updateProduct);

router.get('/',sanPhamController.index);



module.exports = router;