import { Router } from "express";
import { verifyAuthentication } from "../middlewares/auth";
import { getByRoom, createMessage } from "../controllers/messages";
import { chatRoomIdParam, sendMessageValidation } from "../validations/messages";
import { validation } from "../middlewares/error";

const router = Router();

router.get("/room/:chatRoomId", verifyAuthentication, chatRoomIdParam, validation, getByRoom);
router.post("/room/:chatRoomId", verifyAuthentication, chatRoomIdParam, sendMessageValidation, validation, createMessage);

export default router;