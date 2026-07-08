import { Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares/error";
import { sendSuccessResponse } from "../middlewares/success";
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategoryById, } from "../services/categories";
import { ID } from "../types/variables";

export const getAll = catchAsyncErrors(async (_: Request, res: Response) => {
  const categories = await getAllCategories();
  sendSuccessResponse(res, 200, "Categories fetched successfully", categories);
});

export const getById = catchAsyncErrors(async (req: Request, res: Response) => {
  const id = req.params.id as ID;
  const category = await getCategoryById(id);
  sendSuccessResponse(res, 200, "Category fetched successfully", category);
});

export const create = catchAsyncErrors(async (req: Request, res: Response) => {
  const data = req.body;
  const file = req.file;
  const category = await createCategory(data, file);
  sendSuccessResponse(res, 201, "Category created successfully", category);
});

export const update = catchAsyncErrors(async (req: Request, res: Response) => {
  const id = req.params.id as ID;
  const data = req.body;
  const file = req.file;
  const category = await updateCategory(id, data, file);
  sendSuccessResponse(res, 200, "Category updated successfully", category);
});

export const remove = catchAsyncErrors(async (req: Request, res: Response) => {
  const id = req.params.id as ID;
  const data = await deleteCategoryById(id);
  sendSuccessResponse(res, 200, "Category deleted successfully", data);
});