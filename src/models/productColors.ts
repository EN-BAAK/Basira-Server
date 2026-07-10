import { DataTypes, Model, Sequelize } from "sequelize";

export class ProductColor extends Model {}

export default (sequelize: Sequelize) => {
  ProductColor.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      colorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "product_colors",
      timestamps: false,
      indexes: [
        { fields: ["productId"] },
        { fields: ["colorId"] }
      ]
    }
  );

  return ProductColor;
};