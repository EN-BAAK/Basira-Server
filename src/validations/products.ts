import { body, param } from "express-validator";

export const productId = [
  param("id").isInt().withMessage("Product id must be integer"),
];

export const createProductValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("categoryId").isInt().withMessage("Category ID must be integer"),
  body("brandId").isInt().withMessage("Brand ID must be integer"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
];