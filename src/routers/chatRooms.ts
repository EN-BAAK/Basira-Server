import { Router } from "express";
import { verifyAuthentication } from "../middlewares/auth";
import { getAll, create, updateTitle, remove } from "../controllers/chatRooms";
import { createChatRoomValidation, updateChatRoomTitleValidation, chatRoomId, } from "../validations/chatRooms";
import { validation } from "../middlewares/error";

const router = Router();

router.get("/", verifyAuthentication, getAll);

router.post("/", verifyAuthentication, createChatRoomValidation, validation, create);

router.put("/:id", verifyAuthentication, chatRoomId, updateChatRoomTitleValidation, validation, updateTitle);

router.delete("/:id", verifyAuthentication, chatRoomId, validation, remove);

export default router;