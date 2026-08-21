import { DataTypes, Model, Sequelize, } from "sequelize";
import { SaleAttributes, SaleCreationAttributes, } from "../types/models";
import { ID } from "../types/variables";

export class Sale extends Model<SaleAttributes, SaleCreationAttributes> implements SaleAttributes {
  public id!: ID;
  public totalPrice!: number;
  public productVariantId!: ID;
  public quantity!: number;

  public toJSON(): object {
    return { ...this.get() };
  }

  static associate(models: any) {
    Sale.belongsTo(models.ProductVariant, {
      foreignKey: "productVariantId",
      as: "productVariant",
      onDelete: "RESTRICT",
    });
  }
}

export default (sequelize: Sequelize) => {
  Sale.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      productVariantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "sales",
      timestamps: false,

      indexes: [
        {
          fields: ["productVariantId"],
        },
      ],
    }
  );

  return Sale;
};