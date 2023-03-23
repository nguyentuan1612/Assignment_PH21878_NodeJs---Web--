const express = require('express');
const router = express.Router();

const sanPhamController = require('../app/controllers/sanPhamController');

router.get('/sanPhamDetail',sanPhamController.goToDetail);
router.get('/',sanPhamController.index);


module.exports = router;