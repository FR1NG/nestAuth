import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  logIn(@Body() authCredentials: AuthCredentialsDto) {
    return this.authService.logIn(authCredentials);
  }
}
