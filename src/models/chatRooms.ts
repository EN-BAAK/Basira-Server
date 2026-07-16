import { DataTypes, Model, Sequelize } from "sequelize";
import { ChatRoomAttributes, ChatRoomCreationAttributes } from "../types/models";
import { ID } from "../types/variables";

export class ChatRoom extends Model<ChatRoomAttributes, ChatRoomCreationAttributes> implements ChatRoomAttributes {
  public id!: ID;
  public userId!: ID;
  public title!: string;
  public createdAt!: Date;

  public toJSON(): object {
    return { ...this.get() };
  }

  static associate(models: any) {
    ChatRoom.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
  }
}

export default (sequelize: Sequelize) => {
  ChatRoom.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "chat_rooms",
      timestamps: false,
      createdAt: true,
      indexes: [
        {
          name: "chat_rooms_user_id_created_at_idx",
          fields: ["userId", "createdAt"],
        },
      ],
    }
  );

  return ChatRoom;
};