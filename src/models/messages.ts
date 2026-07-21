import { DataTypes, Model, Sequelize } from "sequelize";
import { MessageAttributes, MessageCreationAttributes } from "../types/models";
import { ID, MessageRole } from "../types/variables";

export class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: ID;
  public chatRoomId!: ID;
  public role!: MessageRole;
  public content!: string;
  public createdAt!: Date;

  public toJSON(): object {
    const data = this.get()
    return { ...data, chatRoomId: undefined };
  }

  static associate(models: any) {
    Message.belongsTo(models.ChatRoom, {
      foreignKey: "chatRoomId",
      as: "chatRoom",
      onDelete: "CASCADE",
    });
  }
}

export default (sequelize: Sequelize) => {
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      chatRoomId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(...Object.values(MessageRole)),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
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
      tableName: "messages",
      timestamps: false,
      createdAt: true,
      indexes: [
        {
          name: "messages_chat_room_id_created_at_idx",
          fields: ["chatRoomId", "createdAt"],
        },
      ],
    }
  );

  return Message;
};