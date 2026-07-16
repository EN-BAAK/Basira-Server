import { body, param } from "express-validator";

export const chatRoomIdParam = [
  param("chatRoomId").isInt().withMessage("Chat room ID must be an integer"),
];

export const sendMessageValidation = [
  body("content").notEmpty().withMessage("Message content cannot be empty"),
];