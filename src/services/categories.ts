import { Category } from "../models/categories";
import { Product } from "../models/products";
import { CategoryCreationAttributes } from "../types/models";
import { ID } from "../types/variables";
import ErrorHandler from "../middlewares/error";
import fs from "fs";

const findCategoryById = async (id: ID) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new ErrorHandler("Category not found", 404);
  }
  return category;
};

export const getAllCategories = async () => {
  const categories = await Category.findAll({
    include: [
      {
        model: Product,
        as: "products",
        attributes: ["id"],
      },
    ],
  });

  return categories.map((cat: any) => {
    const json = cat.toJSON();
    return {
      id: json.id,
      name: json.name,
      description: json.description,
      imgUrl: json.imgUrl,
      productsCount: json.products?.length || 0,
      products: undefined
    };
  });
};

export const getCategoryById = async (id: ID) => {
  const category = await findCategoryById(id);
  return category.toJSON();
};

export const createCategory = async (data: CategoryCreationAttributes, image?: Express.Multer.File) => {
  if (!image) {
    throw new ErrorHandler("Category image is required", 400);
  }

  const imgUrl = `uploads/categories/${image.filename}`;
  const category = await Category.create({ ...data, imgUrl });

  return category.toJSON();
};

export const updateCategory = async (
  id: ID,
  data: Partial<CategoryCreationAttributes>,
  image?: Express.Multer.File
) => {
  const category = await findCategoryById(id);

  if (image) {
    if (category.imgUrl && fs.existsSync(category.imgUrl)) {
      fs.unlinkSync(category.imgUrl);
    }
    category.imgUrl = `uploads/categories/${image.filename}`;
  }

  Object.assign(category, data);
  await category.save();

  return category.toJSON();
};

export const deleteCategoryById = async (id: ID) => {
  const category = await findCategoryById(id);
  await category.destroy();
  return category;
};