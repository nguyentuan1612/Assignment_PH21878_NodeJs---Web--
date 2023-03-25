const express = require('express');
const router = express.Router();

const SiteController = require('../app/controllers/SiteController');

router.get('/login',SiteController.login);
router.get('/register',SiteController.register);
router.get('/account',SiteController.account);

module.exports = router;

