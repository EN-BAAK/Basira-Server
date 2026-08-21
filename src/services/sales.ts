import { Sale } from "../models/sales";
import { ProductVariant } from "../models/productVariants";
import { Product } from "../models/products";
import { Color } from "../models/colors";
import { Size } from "../models/sizes";
import { ID } from "../types/variables";
import ErrorHandler from "../middlewares/error";
import { CreateSaleData, GetSalesParams } from "../types/query";

const findSaleById = async (id: ID) => {
  const sale = await Sale.findByPk(id, {
    include: [
      {
        model: ProductVariant,
        as: "productVariant",
        attributes: [
          "id",
          "productId",
          "colorId",
          "sizeId",
          "quantity",
        ],
        include: [
          {
            model: Product,
            as: "product",
            attributes: [
              "id",
              "title",
              "price",
              "imgUrl",
            ],
          },
          {
            model: Color,
            as: "color",
            attributes: ["id", "name"],
          },
          {
            model: Size,
            as: "size",
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });

  if (!sale) {
    throw new ErrorHandler("Sale not found", 404);
  }

  return sale;
};

export const getAllSales = async ({ page = 1, limit = 10, }: GetSalesParams) => {
  const offset = (page - 1) * limit;

  const { rows, count } = await Sale.findAndCountAll({
    limit,
    offset,

    order: [["id", "DESC"]],

    include: [
      {
        model: ProductVariant,
        as: "productVariant",
        attributes: [
          "id",
          "productId",
          "colorId",
          "sizeId",
          "quantity",
        ],

        include: [
          {
            model: Product,
            as: "product",
            attributes: [
              "id",
              "title",
              "price",
              "imgUrl",
            ],
          },

          {
            model: Color,
            as: "color",
            attributes: ["id", "name"],
          },

          {
            model: Size,
            as: "size",
            attributes: ["id", "name"],
          },
        ],
      },
    ],

    distinct: true,
  });

  return {
    sales: rows,

    pagination: {
      page,
      limit,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
    },
  };
};

export const createSale = async (
  data: CreateSaleData
) => {
  const sequelize = Sale.sequelize;

  if (!sequelize) {
    throw new ErrorHandler(
      "Database connection not initialized",
      500
    );
  }

  const saleId = await sequelize.transaction(
    async (transaction) => {
      const variant = await ProductVariant.findByPk(
        data.productVariantId,
        {
          transaction,
          lock: transaction.LOCK.UPDATE,
        }
      );

      if (!variant) {
        throw new ErrorHandler(
          "Product variant not found",
          404
        );
      }

      if (data.quantity <= 0) {
        throw new ErrorHandler(
          "Quantity must be greater than zero",
          400
        );
      }

      if (variant.quantity < data.quantity) {
        throw new ErrorHandler(
          "Insufficient product quantity",
          400
        );
      }

      const product = await Product.findByPk(
        variant.productId,
        {
          transaction,
          attributes: ["id", "price"],
        }
      );

      if (!product) {
        throw new ErrorHandler(
          "Product not found",
          404
        );
      }

      const totalPrice = Number(
        (
          Number(product.price) * data.quantity
        ).toFixed(2)
      );

      const sale = await Sale.create(
        {
          productVariantId: data.productVariantId,
          quantity: data.quantity,
          totalPrice,
        },
        {
          transaction,
        }
      );

      variant.quantity -= data.quantity;

      await variant.save({
        transaction,
      });

      return sale.id;
    }
  );

  return await findSaleById(saleId);
};

export const deleteSale = async (id: ID) => {
  const sequelize = Sale.sequelize;

  if (!sequelize) {
    throw new ErrorHandler(
      "Database connection not initialized",
      500
    );
  }

  return await sequelize.transaction(
    async (transaction) => {
      const sale = await Sale.findByPk(id, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!sale) {
        throw new ErrorHandler(
          "Sale not found",
          404
        );
      }

      const variant =
        await ProductVariant.findByPk(
          sale.productVariantId,
          {
            transaction,
            lock: transaction.LOCK.UPDATE,
          }
        );

      if (!variant) {
        throw new ErrorHandler(
          "Product variant not found",
          404
        );
      }

      variant.quantity += sale.quantity;

      await variant.save({
        transaction,
      });

      await sale.destroy({
        transaction,
      });

      return {
        id: sale.id,
      };
    }
  );
};