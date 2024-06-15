import { HttpException, HttpStatus } from "@nestjs/common";

const DEFAULT_REASON =
  "Error in authorization. Please check the authorization token";

export class AuthorizationError extends HttpException {
  constructor(reason: string = DEFAULT_REASON) {
    super(reason, HttpStatus.UNAUTHORIZED);
  }
}
