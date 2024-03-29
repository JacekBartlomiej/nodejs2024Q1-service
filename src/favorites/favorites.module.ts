import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, AppService],
})
export class FavoritesModule {}
