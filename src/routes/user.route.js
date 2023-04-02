const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/userController");
const UploadController = require("../app/controllers/uploadController");

router.get("/createUser", userController.createUser);
router.get("/userDetail/:id", userController.userDetail);
router.post("/:id/updateUser",UploadController.upload.single('imageUser'), userController.updateUser);
router.post("/createUser/storeCreate",UploadController.upload.single('imageUser'),userController.storeCreate);
router.post("/createUser/storeRegister", userController.storeRegister);
router.post("/login", userController.login);
router.get("/account", userController.account);
router.put("/:id/updateAccount", userController.updateAccount);
router.get("/", userController.index);

module.exports = router