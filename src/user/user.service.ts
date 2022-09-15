import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>
  ) { }

  async register(userData: CreateUserDto): Promise<void> {

    const { username, password } = userData;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    const user = this.UserRepository.create({ username, password: hashed });
    try {
      await this.UserRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ConflictException('User name already taken');
      else
        throw new InternalServerErrorException()
    }
  }

  async getUsers() {
    const users = await this.UserRepository.find();
    return users;
  }
}
