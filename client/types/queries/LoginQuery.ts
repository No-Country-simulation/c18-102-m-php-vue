import type { UserType } from "../models";

export interface LoginReq {
  email: string;
  password: string;
  rememberPassword?: boolean;
}

export interface LoginRes {
  token: string;
  expires_in: number;
  user: UserType;

  // Si es error
  error?: string;
}
