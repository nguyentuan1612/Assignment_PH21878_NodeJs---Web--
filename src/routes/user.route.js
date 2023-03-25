const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/userController");
router.get("/createUser", userController.createUser);
router.post("/:id/edit", userController.updateUser);
router.post("/createUser/store", userController.store);
router.post("/login", userController.login);
router.get("/", userController.index);

module.exports = router