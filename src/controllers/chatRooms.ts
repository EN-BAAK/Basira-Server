import { Response } from "express";
import { catchAsyncErrors } from "../middlewares/error";
import { sendSuccessResponse } from "../middlewares/success";
import { getRoomsByUserId, createRoom, updateRoomTitle, deleteRoomById, } from "../services/chatRooms";
import { AuthenticatedRequest, ID } from "../types/variables";

export const getAll = catchAsyncErrors(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.id! as ID;
  const rooms = await getRoomsByUserId(userId);
  sendSuccessResponse(res, 200, "Chat rooms fetched successfully", rooms);
});

export const create = catchAsyncErrors(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.id! as ID;
  const { title } = req.body;
  const room = await createRoom({ userId, title });
  sendSuccessResponse(res, 201, "Chat room created successfully", room);
});

export const updateTitle = catchAsyncErrors(async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as ID;
  const { title } = req.body;
  const room = await updateRoomTitle(id, title);
  sendSuccessResponse(res, 200, "Chat room title updated successfully", room);
});

export const remove = catchAsyncErrors(async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as ID;
  const data = await deleteRoomById(id);
  sendSuccessResponse(res, 200, "Chat room deleted successfully", data);
});