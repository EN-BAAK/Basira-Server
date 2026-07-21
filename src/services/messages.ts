import { Message } from "../models/messages";
import { ID, MessageRole } from "../types/variables";
import db from "../models";
import { createRoom } from "../services/chatRooms";

const mockAiServerCall = async (userPrompt: string): Promise<string> => {
  `${userPrompt}`

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("responded from ai");
    }, 500);
  });
};

export const getMessagesByRoomId = async (chatRoomId: ID) => {
  const messagesResponse = await Message.findAll({
    where: { chatRoomId },
    order: [["createdAt", "ASC"]],
  });

  const messages = messagesResponse ? messagesResponse.map(m => m.toJSON()) as any : []
  return messages;
};

export const sendMessage = async (chatRoomId: ID, content: string, userId: ID) => {
  if (!db || !db.sequelize) return;
  const t = await db.sequelize.transaction();
  try {
    let currentChatRoomId = chatRoomId as ID
    let createdRoom = undefined
  
    if (currentChatRoomId == "-1") {
      createdRoom = await createRoom({ title: "محادثة جديدة", userId }, t) as any
      currentChatRoomId = createdRoom.id
    }

    const userMessage = await Message.create(
      { chatRoomId: currentChatRoomId, role: MessageRole.USER, content },
      { transaction: t }
    );

    const aiResponseText = await mockAiServerCall(content);

    const aiMessage = await Message.create(
      { chatRoomId: currentChatRoomId, role: MessageRole.ASSISTANT, content: aiResponseText },
      { transaction: t }
    );

    await t.commit();

    return {
      messages: [userMessage.toJSON(), aiMessage.toJSON(),],
      roomId: currentChatRoomId,
      createdRoom: createdRoom
    };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};