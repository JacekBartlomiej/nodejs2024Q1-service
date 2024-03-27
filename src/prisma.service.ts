import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async getFavorites() {
    let favorites = await this.favorites.findFirst();
    if (!favorites) {
      favorites = await this.favorites.create({
        data: {
          // Initially empty or with some default values
          artistIds: [],
          albumIds: [],
          trackIds: [],
        },
      });
    }
    return favorites;
  }
}
