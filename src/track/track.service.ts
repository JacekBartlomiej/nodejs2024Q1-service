import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { AppService, LocalDb } from 'src/app.service';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackService {
  localDb: LocalDb = this.appService.localDb;
  constructor(private appService: AppService) {}
  create(createTrackDto: CreateTrackDto) {
    const createdTrack = {
      id: randomUUID(),
      ...createTrackDto,
    };
    this.localDb.tracks.push(createdTrack);
    return createdTrack;
  }

  findAll() {
    return this.localDb.tracks;
  }

  findOne(id: string) {
    const track = this.localDb.tracks.find((track) => track.id === id);
    if (track) {
      return track;
    } else {
      throw new NotFoundException();
    }
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = this.localDb.tracks.findIndex(
      (track) => track.id === id,
    );
    if (trackIndex > -1) {
      this.localDb.tracks[trackIndex] = {
        ...this.localDb.tracks[trackIndex],
        ...updateTrackDto,
      };
      return this.localDb.tracks[trackIndex];
    } else {
      throw new NotFoundException();
    }
  }

  remove(id: string) {
    const trackIndex = this.localDb.tracks.findIndex(
      (track) => track.id === id,
    );
    if (trackIndex > -1) {
      return (this.localDb.tracks = this.localDb.tracks.filter(
        (track) => track.id !== id,
      ));
    } else {
      throw new NotFoundException();
    }
  }
}
