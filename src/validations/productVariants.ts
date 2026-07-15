import { body, param } from "express-validator";

export const variantId = [
  param("id").isInt().withMessage("Variant id must be integer"),
];

export const createVariantValidation = [
  body("productId").isInt().withMessage("Product ID must be integer"),
  body("colorId").optional({ nullable: true }).isInt(),
  body("sizeId").optional({ nullable: true }).isInt(),
  body("quantity").isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),
];

export const updateQuantityValidation = [
  body("quantity").isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),
];