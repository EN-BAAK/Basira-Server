import { Router } from "express";
import { verifyAuthentication } from "../middlewares/auth";
import { validation } from "../middlewares/error";
import { verifyUser, changePassword, forgotPassword, resetForgottenPassword, login, logout, } from "../controllers/users";
import { changePasswordValidation, forgotPasswordValidation, resetForgottenPasswordValidation, loginValidation, } from "../validations/users";

const router = Router();

router.get("/verify-me", verifyAuthentication, verifyUser);

router.post("/logout", verifyAuthentication, logout);
router.post("/login", loginValidation, validation, login);

router.patch("/forgot-password/:email", forgotPasswordValidation, validation, forgotPassword);
router.patch("/reset-password", resetForgottenPasswordValidation, validation, resetForgottenPassword);
router.put("/change-password", verifyAuthentication, changePasswordValidation, validation, changePassword);

export default router;