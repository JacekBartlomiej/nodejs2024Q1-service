import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AppService],
})
export class AlbumModule {}
