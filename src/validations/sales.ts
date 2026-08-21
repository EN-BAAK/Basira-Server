import {
  body,
  param,
  query,
} from "express-validator";

export const getSalesValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Page must be a positive integer"
    ),

  query("limit")
    .optional()
    .isInt({
      min: 1,
      max: 100,
    })
    .withMessage(
      "Limit must be between 1 and 100"
    ),
];

export const createSaleValidation = [
  body("productVariantId")
    .isInt({ min: 1 })
    .withMessage(
      "Product variant ID must be a positive integer"
    ),

  body("quantity")
    .isInt({ min: 1 })
    .withMessage(
      "Quantity must be a positive integer"
    ),
];

export const saleIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage(
      "Sale ID must be a positive integer"
    ),
];