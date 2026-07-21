import { ChatRoom } from "../models/chatRooms";
import { ChatRoomCreationAttributes } from "../types/models";
import { ID } from "../types/variables";
import ErrorHandler from "../middlewares/error";

const findRoomById = async (id: ID) => {
  const room = await ChatRoom.findByPk(id);
  if (!room) {
    throw new ErrorHandler("Chat room not found", 404);
  }
  return room;
};

export const getRoomsByUserId = async (userId: ID) => {
  const rooms = await ChatRoom.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
  return rooms.map((r) => r.toJSON());
};

export const createRoom = async (data: ChatRoomCreationAttributes, transaction?: any) => {
  const room = await ChatRoom.create(data, {transaction});
  return room.toJSON();
};

export const updateRoomTitle = async (id: ID, title: string) => {
  const room = await findRoomById(id);
  room.title = title;
  await room.save();
  return room.toJSON();
};

export const deleteRoomById = async (id: ID) => {
  const room = await findRoomById(id);
  await room.destroy();
  return room;
};