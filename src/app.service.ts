import { Injectable } from '@nestjs/common';
import { User } from './user/entities/user.entity';
import { randomUUID } from 'crypto';

export interface LocalDb {
  users: User[];
}

@Injectable()
export class AppService {
  localDb: LocalDb = {
    users: [
      {
        id: randomUUID(),
        login: 'user1',
        password: '1234',
        version: 1,
        createdAt: 1710001894841,
        updatedAt: 1710001894841,
      },
    ],
  };

  getHello(): string {
    return 'Hello World!';
  }
}
