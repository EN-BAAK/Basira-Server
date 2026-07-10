import ErrorHandler from "../middlewares/error";
import { generateVerificationCode } from "../utils/encrypt";
import { ID } from "../types/variables";
import { resetEmailMessage, sendEmail } from "../utils/mails";
import { User } from "../models/users";
import { PasswordReset } from "../models/passwordReset";
import jwt from "jsonwebtoken";

export const verifyUserService = async (userId: ID) => {
  const user = await User.findByPk(userId);
  if (!user) throw new ErrorHandler("User not found", 404);

  return user.toJSON();
};

export const changePasswordService = async (userId: ID, password: '', newPassword: '') => {
  const user = await User.findByPk(userId);
  if (!user) throw new ErrorHandler("User not found", 404);

  const isMatch = await user.checkPassword(password);
  if (!isMatch) throw new ErrorHandler("Current password is incorrect", 401);

  user.password = newPassword;
  await user.save();

  return { message: "Password changed successfully" };
};

export const forgotPasswordService = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new ErrorHandler("User not found", 404);

  await PasswordReset.destroy({ where: { userId: user.id } });

  const code = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await PasswordReset.create({
    userId: user.id,
    code,
    expiresAt,
  });

  const htmlMessage = resetEmailMessage(code);
  await sendEmail(user.email, "Basira - Password Reset Request", htmlMessage);

  return { message: "Reset code sent to email" };
};

export const resetForgottenPasswordService = async (code: string, newPassword: '') => {
  const reset = await PasswordReset.findOne({ where: { code, isVerified: false } });
  if (!reset || reset.expiresAt < new Date()) {
    throw new ErrorHandler("Invalid or expired code", 400);
  }

  const user = await User.findByPk(reset.userId);
  if (!user) throw new ErrorHandler("User not found", 404);

  user.password = newPassword;
  await user.save();

  await reset.destroy();

  return { message: "Password successfully reset" };
};


export const loginService = async (email: string, password: '') => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new ErrorHandler("Invalid email or password", 401);

  const isMatch = await user.checkPassword(password);
  if (!isMatch) throw new ErrorHandler("Invalid email or password", 401);

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return { user: user.toJSON(), token };
};