import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }
  async logIn(userCredentials: AuthCredentialsDto) {
    const { username, password } = userCredentials;
    const user = await this.userRepository.findOneBy({ username: username })
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const token = await this.jwtService.sign(payload);
      return { token };
    }
    else {
      throw new UnauthorizedException('credentials not correct !')
    }
  }
}
