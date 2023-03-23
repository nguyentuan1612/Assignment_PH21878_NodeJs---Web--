const express = require('express');
const router = express.Router();

const SiteController = require('../app/controllers/SiteController');

router.get('/login',SiteController.login);
router.get('/register',SiteController.register);
router.get('/addProduct',SiteController.addProduct);
router.get('/account',SiteController.account);
router.get('/listUser',SiteController.listUser);
router.get('/addUser',SiteController.addUser);

module.exports = router;

