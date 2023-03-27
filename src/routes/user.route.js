const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/userController");
router.get("/createUser", userController.createUser);
router.post("/:id/edit", userController.updateUser);
router.post("/createUser/storeCreate", userController.storeCreate);
router.post("/createUser/storeRegister", userController.storeRegister);

router.post("/login", userController.login);
router.get("/account", userController.account);
router.get("/", userController.index);

module.exports = router