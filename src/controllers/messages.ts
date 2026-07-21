import { Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares/error";
import { sendSuccessResponse } from "../middlewares/success";
import { getMessagesByRoomId, sendMessage } from "../services/messages";
import { AuthenticatedRequest, ID } from "../types/variables";

export const getByRoom = catchAsyncErrors(async (req: Request, res: Response) => {
  const chatRoomId = req.params.chatRoomId as ID;
  const messages = await getMessagesByRoomId(chatRoomId);
  sendSuccessResponse(res, 200, "Messages fetched successfully", messages);
});

export const createMessage = catchAsyncErrors(async (req: AuthenticatedRequest, res: Response) => {
  const chatRoomId = req.params.chatRoomId as ID;
  const { content } = req.body;
  const userId = req.id!
  const result = await sendMessage(chatRoomId, content, userId);
  sendSuccessResponse(res, 201, "Message processed successfully", result);
});