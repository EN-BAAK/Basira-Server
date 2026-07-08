import { Router } from "express";
import { verifyAuthentication } from "../middlewares/auth";
import { getAll, getById, create, update, remove } from "../controllers/categories";
import { createCategoryValidation, categoryId } from "../validations/categories";
import { uploadCategoryImage } from "../utils/multer";

const router = Router();

router.get("/", getAll);
router.get("/:id", categoryId, getById);

router.post("/", verifyAuthentication, uploadCategoryImage.single("image"), createCategoryValidation, create);

router.put("/:id", verifyAuthentication, categoryId, uploadCategoryImage.single("image"), update);

router.delete("/:id", verifyAuthentication, categoryId, remove);

export default router;