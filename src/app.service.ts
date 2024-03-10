import { Injectable } from '@nestjs/common';
import { User } from './user/entities/user.entity';
import { randomUUID } from 'crypto';
import { Artist } from './artist/entities/artist.entity';
import { Track } from './track/entities/track.entity';
import { Album } from './album/entities/album.entity';

export interface LocalDb {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
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
    artists: [],
    tracks: [],
    albums: [],
  };

  getHello(): string {
    return 'Hello World!';
  }
}
