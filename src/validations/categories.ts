import { body, param } from "express-validator";

export const categoryId = [
  param("id").isInt().withMessage("Category id must be integer"),
];

export const createCategoryValidation = [
  body("name").notEmpty().withMessage("Category name is required"),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Description cannot exceed 200 characters"),
];