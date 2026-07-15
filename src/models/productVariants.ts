import { DataTypes, Model, Sequelize } from "sequelize";
import { ProductVariantAttributes, ProductVariantCreationAttributes } from "../types/models";
import { ID } from "../types/variables";

export class ProductVariant extends Model<ProductVariantAttributes, ProductVariantCreationAttributes> implements ProductVariantAttributes {
  public id!: ID;
  public productId!: ID;
  public colorId!: ID | null;
  public sizeId!: ID | null;
  public quantity!: number;

  public toJSON(): object {
    return { ...this.get() };
  }

  static associate(models: any) {
    ProductVariant.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
      onDelete: "CASCADE",
    });

    ProductVariant.belongsTo(models.Color, {
      foreignKey: "colorId",
      as: "color",
      onDelete: "SET NULL",
    });

    ProductVariant.belongsTo(models.Size, {
      foreignKey: "sizeId",
      as: "size",
      onDelete: "SET NULL",
    });
  }
}

export default (sequelize: Sequelize) => {
  ProductVariant.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      colorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sizeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "product_variants",
      timestamps: false,
      indexes: [
        { fields: ["productId"] },
        { fields: ["colorId"] },
        { fields: ["sizeId"] }
      ]
    }
  );

  return ProductVariant;
};