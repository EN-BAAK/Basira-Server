import { Request } from "express";
import { Dialect } from "sequelize";

export type ID = string

export type BlacklistedToken = {
  token: string;
  expiresAt: number;
};

export interface AuthenticatedRequest extends Request {
  id?: ID,
}

export interface IConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
}