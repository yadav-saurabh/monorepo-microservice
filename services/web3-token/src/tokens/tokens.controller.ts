import { Controller, Get } from '@nestjs/common';

@Controller('tokens')
export class TokensController {
  @Get()
  getToken() {
    return {
      token:
        'token data: Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
    };
  }
}
