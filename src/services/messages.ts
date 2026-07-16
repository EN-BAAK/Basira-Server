import { Message } from "../models/messages";
import { ID, MessageRole } from "../types/variables";
import db from "../models";

const mockAiServerCall = async (userPrompt: string): Promise<string> => {
  `${userPrompt}`

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("responsed from ai");
    }, 500);
  });
};

export const getMessagesByRoomId = async (chatRoomId: ID) => {
  const messages = await Message.findAll({
    where: { chatRoomId },
    order: [["createdAt", "ASC"]],
  });
  return messages.map((m) => m.toJSON());
};

export const sendMessage = async (chatRoomId: ID, content: string) => {
  if (!db || !db.sequelize) return;
  const t = await db.sequelize.transaction();

  try {
    const userMessage = await Message.create(
      { chatRoomId, role: MessageRole.USER, content },
      { transaction: t }
    );

    const aiResponseText = await mockAiServerCall(content);

    const aiMessage = await Message.create(
      { chatRoomId, role: MessageRole.ASSISTANT, content: aiResponseText },
      { transaction: t }
    );

    await t.commit();

    return {
      userMessage: userMessage.toJSON(),
      aiMessage: aiMessage.toJSON(),
    };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};