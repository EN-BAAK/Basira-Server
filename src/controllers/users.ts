import { Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares/error";
import { sendSuccessResponse } from "../middlewares/success";
import { AuthenticatedRequest } from "../types/variables";
import { verifyUserService,  changePasswordService, forgotPasswordService, resetForgottenPasswordService, loginService, } from "../services/users";
import jwt from "jsonwebtoken";
import { addToBlacklist } from "../utils/tokenBlacklist";

export const verifyUser = catchAsyncErrors(async (req: AuthenticatedRequest, res: Response) => {
  const id = req.id!;
  const user = await verifyUserService(id);
  sendSuccessResponse(res, 200, "User is verified", user);
});

export const changePassword = catchAsyncErrors(async (req: AuthenticatedRequest, res: Response) => {
  const id = req.id!;
  const { password, newPassword } = req.body;
  const result = await changePasswordService(id, password, newPassword);
  sendSuccessResponse(res, 200, result.message);
});

export const forgotPassword = catchAsyncErrors(async (req: Request, res: Response) => {
  const email = req.params.email as string;
  const result = await forgotPasswordService(email);
  sendSuccessResponse(res, 200, result.message);
});

export const resetForgottenPassword = catchAsyncErrors(async (req: Request, res: Response) => {
  const { code, password } = req.body;
  const result = await resetForgottenPasswordService(code, password);
  sendSuccessResponse(res, 200, result.message);
});

export const logout = catchAsyncErrors(async (req: Request, res: Response) => {
  const token = req.cookies?.[process.env.COOKIE_NAME!];
  if (token) {
    const decoded = jwt.decode(token) as { exp?: number } | null;
    if (decoded?.exp) {
      addToBlacklist(token, decoded.exp);
    }
  }

  res.clearCookie(process.env.COOKIE_NAME!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  sendSuccessResponse(res, 200, "Logged out successfully");
});

export const login = catchAsyncErrors(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await loginService(email, password);

  res.cookie(process.env.COOKIE_NAME!, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: parseInt(process.env.COOKIE_EXPIRE_MS!, 10)
  });

  sendSuccessResponse(res, 200, "Logged in successfully", user)
})