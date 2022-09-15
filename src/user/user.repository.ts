import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./user.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createUser(userData: CreateUserDto) {
    // const user = this.create(userData);
    // return await this.save(user);
    console.log(this)
    return userData;
  }
}
