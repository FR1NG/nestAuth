import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';
import { GetUser } from './../auth/getUser.decorator'

@Controller('users')
export class UserController {
  constructor(private UserService: UserService) { }
  @Post()
  register(@Body() userData: CreateUserDto) {
    return this.UserService.register(userData)
  }

  @Get()
  @UseGuards(AuthGuard())
  getUsers(@GetUser() user) {
    return this.UserService.getUsers();
  }
}
