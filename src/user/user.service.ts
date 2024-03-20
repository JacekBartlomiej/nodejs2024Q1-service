import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomUUID } from 'crypto';
import { localDb } from 'src/localDb';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const createdUser = {
      id: randomUUID(),
      login: createUserDto.login,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    localDb.users.push({
      ...createdUser,
      password: createUserDto.password,
    });
    return createdUser;
  }

  findAll() {
    return localDb.users;
  }

  findOne(id: string) {
    const user = localDb.users.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = localDb.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      if (updateUserDto.oldPassword === localDb.users[userIndex].password) {
        localDb.users[userIndex] = {
          ...localDb.users[userIndex],
          version: localDb.users[userIndex].version + 1,
          updatedAt: Date.now(),
          password: updateUserDto.newPassword,
        };
        const user = localDb.users[userIndex];
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
    const userIndex = localDb.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      return (localDb.users = localDb.users.filter((user) => user.id !== id));
    } else {
      throw new NotFoundException();
    }
  }
}
