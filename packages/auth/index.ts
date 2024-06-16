import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import { AuthorizationError } from "@microservices/errors";

export interface UserReqObj {
  id: string;
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
  const token = authorizationHeader.replace(/bearer /i, "");

  try {
    const decodedToken = jwt.decode(token);
    req.user = {
      id: decodedToken.sub,
      isAdmin: !!decodedToken.isAdmin,
    };
    return next();
  } catch {
    throw new AuthorizationError();
  }
};
