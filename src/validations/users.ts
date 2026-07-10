import { body, param } from "express-validator";

export const userIdValidation = [
  param("id").isInt().withMessage("User id must be integer"),
];

export const changePasswordValidation = [
  body("password").notEmpty().withMessage("Current password is required"),
  body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters long"),
];

export const forgotPasswordValidation = [
  param("email").isEmail().withMessage("Valid email is required"),
];

export const resetForgottenPasswordValidation = [
  body("code").notEmpty().withMessage("Reset code is required"),
  body("password").isLength({ min: 6 }).withMessage("New password must be at least 6 characters long"),
];

export const loginValidation = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isString().withMessage("Password must be a string"),
];