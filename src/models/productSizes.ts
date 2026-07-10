import { DataTypes, Model, Sequelize } from "sequelize";

export class ProductSize extends Model {}

export default (sequelize: Sequelize) => {
  ProductSize.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sizeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "product_sizes",
      timestamps: false,
      indexes: [
        { fields: ["productId"] },
        { fields: ["sizeId"] }
      ]
    }
  );

  return ProductSize;
};