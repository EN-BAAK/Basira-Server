import { DataTypes, Model, Sequelize } from "sequelize";
import path from "path";
import fs from "fs";
import { CategoryAttributes, CategoryCreationAttributes } from "../types/models";
import { ID } from "../types/variables";

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: ID;
  public name!: string;
  public description!: string | null;
  public imgUrl!: string;

  public toJSON(): object {
    return { ...this.get() };
  }

  static associate(models: any) {
    Category.hasMany(models.Product, {
      foreignKey: "categoryId",
      as: "products",
      onDelete: "CASCADE",
    });
  }
}

export default (sequelize: Sequelize) => {
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      imgUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "categories",
      timestamps: false,
      hooks: {
        beforeDestroy: async (category: Category) => {
          if (category.imgUrl) {
            try {
              const imgPath = path.resolve(category.imgUrl);
              if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
              }
            } catch (err) {
              console.log("Failed to delete category image:", err);
            }
          }
        },
      },
    }
  );

  return Category;
};