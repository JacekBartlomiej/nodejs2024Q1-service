import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AppService, LocalDb } from 'src/app.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistService {
  localDb: LocalDb = this.appService.localDb;
  constructor(private appService: AppService) {}
  create(createArtistDto: CreateArtistDto) {
    const createdArtist = {
      id: randomUUID(),
      ...createArtistDto,
    };
    this.localDb.artists.push(createdArtist);
    return createdArtist;
  }

  findAll() {
    return this.localDb.artists;
  }

  findOne(id: string) {
    const artist = this.localDb.artists.find((artist) => artist.id === id);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException();
    }
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.localDb.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (artistIndex > -1) {
      this.localDb.artists[artistIndex] = {
        ...this.localDb.users[artistIndex],
        ...updateArtistDto,
      };
      return this.localDb.artists[artistIndex];
    } else {
      throw new NotFoundException();
    }
  }

  remove(id: string) {
    const artistIndex = this.localDb.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (artistIndex > -1) {
      return (this.localDb.artists = this.localDb.artists.filter(
        (artist) => artist.id !== id,
      ));
    } else {
      throw new NotFoundException();
    }
  }
}
