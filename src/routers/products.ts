import { Router } from "express";
import { verifyAuthentication } from "../middlewares/auth";
import { getAll, getAllSettings, create, update, remove, getByIdSettings, getById, } from "../controllers/products";
import { createProductValidation, productId } from "../validations/products";
import { uploadProductImage } from "../utils/multer";

const router = Router();

router.get("/", getAll);
router.get("/settings", verifyAuthentication, getAllSettings);
router.get("/:id/settings", verifyAuthentication, productId, getByIdSettings);
router.get("/:id", productId, getById);

router.post("/", verifyAuthentication, uploadProductImage.single("image"), createProductValidation, create);
router.put("/:id", verifyAuthentication, productId, uploadProductImage.single("image"), update);
router.delete("/:id", verifyAuthentication, productId, remove);

export default router;