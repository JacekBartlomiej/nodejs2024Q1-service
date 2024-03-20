import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { randomUUID } from 'crypto';
import { localDb } from 'src/localDb';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const createdTrack = {
      id: randomUUID(),
      ...createTrackDto,
    };
    localDb.tracks.push(createdTrack);
    return createdTrack;
  }

  findAll() {
    return localDb.tracks;
  }

  findOne(id: string) {
    const track = localDb.tracks.find((track) => track.id === id);
    if (track) {
      return track;
    } else {
      throw new NotFoundException();
    }
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = localDb.tracks.findIndex((track) => track.id === id);
    if (trackIndex > -1) {
      localDb.tracks[trackIndex] = {
        ...localDb.tracks[trackIndex],
        ...updateTrackDto,
      };
      return localDb.tracks[trackIndex];
    } else {
      throw new NotFoundException();
    }
  }

  remove(id: string) {
    const trackIndex = localDb.tracks.findIndex((track) => track.id === id);
    if (trackIndex > -1) {
      this.removeTrackFromFavorites(id);
      return (localDb.tracks = localDb.tracks.filter(
        (track) => track.id !== id,
      ));
    } else {
      throw new NotFoundException();
    }
  }

  private removeTrackFromFavorites(id: string) {
    localDb.favorites.tracks = localDb.favorites.tracks.filter(
      (favTrackId) => favTrackId !== id,
    );
  }
}
