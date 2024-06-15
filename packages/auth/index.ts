import { Request, Response, NextFunction } from "express";

import { AuthorizationError } from "@nestjs-microservices/errors";

export interface UserReqObj {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authorizationHeader =
    req.get("Authorization") || req.get("authorization");
  if (!authorizationHeader) {
    throw new AuthorizationError();
  }
  const token = authorizationHeader.replace(/bearer/i, "");

  try {
    console.log(token);
    return next();
  } catch {
    throw new AuthorizationError();
  }
};
