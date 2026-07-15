import { Router } from "express";
import { verifyAuthentication } from "../middlewares/auth";
import { getByProduct, create, updateQuantity, remove } from "../controllers/productVariants";
import { createVariantValidation, updateQuantityValidation, variantId } from "../validations/productVariants";

const router = Router();

router.get("/product/:productId", verifyAuthentication, getByProduct);

router.post("/", verifyAuthentication, createVariantValidation, create);

router.put("/:id/quantity", verifyAuthentication, variantId, updateQuantityValidation, updateQuantity);

router.delete("/:id", verifyAuthentication, variantId, remove);

export default router;