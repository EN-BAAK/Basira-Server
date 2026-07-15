import { ProductVariant } from "../models/productVariants";
import { Color } from "../models/colors";
import { Size } from "../models/sizes";
import { ProductVariantCreationAttributes } from "../types/models";
import { ID } from "../types/variables";
import ErrorHandler from "../middlewares/error";

const findVariantById = async (id: ID) => {
  const variant = await ProductVariant.findByPk(id, {
    include: [
      { model: Color, as: "color", attributes: ["name", "id"] },
      { model: Size, as: "size", attributes: ["name", "id"] },
    ],
  });
  if (!variant) {
    throw new ErrorHandler("Variant not found", 404);
  }
  return variant;
};

export const getVariantsByProductId = async (productId: ID) => {
  const variants = await ProductVariant.findAll({
    where: { productId },
    include: [
      { model: Color, as: "color", attributes: ["name", "id"] },
      { model: Size, as: "size", attributes: ["name", "id"] },
    ],
  });

  return variants.map((v: any) => {
    const json = v.toJSON();
    return {
      id: json.id,
      productId: json.productId,
      color: json.color,
      size: json.size,
      quantity: json.quantity,
    };
  });
};

export const createVariant = async (data: ProductVariantCreationAttributes) => {
  const isExists = await ProductVariant.findOne({ where: { productId: data.productId, colorId: data.colorId || null, sizeId: data.sizeId || null } })
  if (isExists)
    throw new ErrorHandler("Variant already exists", 400)
  const createdVariant = await ProductVariant.create(data);

  const variant = findVariantById(createdVariant.id)
  return variant;
};

export const updateVariantQuantity = async (id: ID, quantity: number) => {
  const variant = await findVariantById(id);
  variant.quantity = quantity;
  await variant.save();
  return variant.toJSON();
};

export const deleteVariant = async (id: ID) => {
  const variant = await findVariantById(id);
  await variant.destroy();
  return variant;
};