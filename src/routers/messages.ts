import { Router } from "express";
import { verifyAuthentication } from "../middlewares/auth";
import { getByRoom, createMessage, createResponse } from "../controllers/messages";
import { chatRoomIdParam, messageValidation } from "../validations/messages";
import { validation } from "../middlewares/error";

const router = Router();

router.get("/room/:chatRoomId", verifyAuthentication, chatRoomIdParam, validation, getByRoom);

router.post("/room/:chatRoomId/receive", verifyAuthentication, chatRoomIdParam, messageValidation, validation, createResponse);
router.post("/room/:chatRoomId", verifyAuthentication, chatRoomIdParam, messageValidation, validation, createMessage);

export default router;