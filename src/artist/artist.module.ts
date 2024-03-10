import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, AppService],
})
export class ArtistModule {}
