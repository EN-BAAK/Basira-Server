import { Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares/error";
import { sendSuccessResponse } from "../middlewares/success";
import { getVariantsByProductId, createVariant, updateVariantQuantity, deleteVariant, } from "../services/productVariants";
import { ID } from "../types/variables";

export const getByProduct = catchAsyncErrors(async (req: Request, res: Response) => {
  const productId = req.params.productId as ID;
  const variants = await getVariantsByProductId(productId);
  sendSuccessResponse(res, 200, "Variants fetched successfully", variants);
});

export const create = catchAsyncErrors(async (req: Request, res: Response) => {
  const data = req.body;
  const variant = await createVariant(data);
  sendSuccessResponse(res, 201, "Variant created successfully", variant);
});

export const updateQuantity = catchAsyncErrors(async (req: Request, res: Response) => {
  const id = req.params.id as ID;
  const { quantity } = req.body;
  const variant = await updateVariantQuantity(id, quantity);
  sendSuccessResponse(res, 200, "Variant quantity updated successfully", variant);
});

export const remove = catchAsyncErrors(async (req: Request, res: Response) => {
  const id = req.params.id as ID;
  const data = await deleteVariant(id);
  sendSuccessResponse(res, 200, "Variant deleted successfully", data);
});