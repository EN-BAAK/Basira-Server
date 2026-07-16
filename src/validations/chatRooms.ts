import { body, param } from "express-validator";

export const chatRoomId = [
  param("id").isInt().withMessage("Chat room ID must be an integer"),
];

export const createChatRoomValidation = [
  body("title").notEmpty().withMessage("Title is required"),
];

export const updateChatRoomTitleValidation = [
  body("title").notEmpty().withMessage("Title is required"),
];