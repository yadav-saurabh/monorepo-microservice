import { UserReqObj } from "../../index.ts";

declare global {
  namespace Express {
    interface Request {
      user: UserReqObj;
    }
  }
}
