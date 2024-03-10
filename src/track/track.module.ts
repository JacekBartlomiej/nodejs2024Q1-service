import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, AppService],
})
export class TrackModule {}
