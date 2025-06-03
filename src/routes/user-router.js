import UserController from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.post("/registro", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logOut);
router.delete("/:uId", UserController.deleteUser);
router.put('/:id',UserController.updateUser);

export default router;