const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/userController");
const UploadController = require("../app/controllers/uploadController");
const passport = require("passport");
require('../app/config/passport/passport')(passport);

router.get("/createUser",passport.authenticate('jwt',{session:false}), userController.createUser);
router.get("/userDetail/:id",passport.authenticate('jwt',{session:false}), userController.userDetail);
router.post("/:id/updateUser",passport.authenticate('jwt',{session:false}),UploadController.upload.single('imageUser'), userController.updateUser);
router.post("/createUser/storeCreate",passport.authenticate('jwt',{session:false}),UploadController.upload.single('imageUser'),userController.storeCreate);
router.post("/createUser/storeRegister", userController.storeRegister);
router.post("/login", userController.login);
router.get("/account",passport.authenticate('jwt',{session:false}), userController.account);
router.put("/:id/updateAccount",passport.authenticate('jwt',{session:false}), userController.updateAccount);
router.delete("/:id/delete",passport.authenticate('jwt',{session:false}), userController.deleteUser);
router.get("/logout",passport.authenticate('jwt',{session:false}), userController.logout);
router.get("/",passport.authenticate('jwt',{session:false}), userController.index);

module.exports = router