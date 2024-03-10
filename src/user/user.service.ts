import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppService, LocalDb } from 'src/app.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  localDb: LocalDb = this.appService.localDb;
  constructor(private appService: AppService) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = {
      id: randomUUID(),
      login: createUserDto.login,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.localDb.users.push({
      ...createdUser,
      password: createUserDto.password,
    });
    return createdUser;
  }

  findAll() {
    return this.localDb.users;
  }

  findOne(id: string) {
    const user = this.localDb.users.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.localDb.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      if (
        updateUserDto.oldPassword === this.localDb.users[userIndex].password
      ) {
        this.localDb.users[userIndex] = {
          ...this.localDb.users[userIndex],
          version: this.localDb.users[userIndex].version + 1,
          updatedAt: Date.now(),
          password: updateUserDto.newPassword,
        };
        const user = this.localDb.users[userIndex];
        return {
          id: user.id,
          login: user.login,
          version: user.version,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
        };
      } else {
        throw new ForbiddenException();
      }
    } else {
      throw new NotFoundException();
    }
  }

  remove(id: string) {
    const userIndex = this.localDb.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      return (this.localDb.users = this.localDb.users.filter(
        (user) => user.id !== id,
      ));
    } else {
      throw new NotFoundException();
    }
  }
}
