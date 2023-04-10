const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/userController");
const UploadController = require("../app/controllers/uploadController");

const Auth = require("../app/config/middleware/middleware")
router.get("/createUser",Auth.auth_session, userController.createUser);
router.get("/userDetail/:id",Auth.auth_session, userController.userDetail);
router.post("/:id/updateUser",Auth.auth_session,UploadController.upload.single('imageUser'), userController.updateUser);
router.post("/createUser/storeCreate",Auth.auth_session,UploadController.upload.single('imageUser'),userController.storeCreate);
router.post("/createUser/storeRegister", userController.storeRegister);
router.post("/login", userController.login);
router.get("/account",Auth.auth_session, userController.account);
router.put("/:id/updateAccount",Auth.auth_session,UploadController.upload.single('imageUser'), userController.updateAccount);
router.delete("/:id/delete",Auth.auth_session, userController.deleteUser);
router.get("/logout",Auth.auth_session, userController.logout);
router.get("/account/updatePassword",Auth.auth_session, userController.updatePasssword);
router.post("/account/:id/updatePassword",Auth.auth_session, userController.updatePassswordPut);
router.get("/",Auth.auth_session, userController.index);

module.exports = router