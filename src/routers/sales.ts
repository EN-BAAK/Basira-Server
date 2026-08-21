import { Router } from "express";

import {
  verifyAuthentication,
} from "../middlewares/auth";

import {
  getAll,
  create,
  remove,
} from "../controllers/sales";

import {
  getSalesValidation,
  createSaleValidation,
  saleIdValidation,
} from "../validations/sales";

const router = Router();

router.get(
  "/",
  verifyAuthentication,
  getSalesValidation,
  getAll
);

router.post(
  "/",
  verifyAuthentication,
  createSaleValidation,
  create
);

router.delete(
  "/:id",
  verifyAuthentication,
  saleIdValidation,
  remove
);

export default router;