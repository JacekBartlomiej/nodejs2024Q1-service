import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, AppService, PrismaService],
})
export class FavoritesModule {}
