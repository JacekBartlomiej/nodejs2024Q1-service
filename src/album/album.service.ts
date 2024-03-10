import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AppService, LocalDb } from 'src/app.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumService {
  localDb: LocalDb = this.appService.localDb;
  constructor(private appService: AppService) {}
  create(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = {
      id: randomUUID(),
      ...createAlbumDto,
    };
    this.localDb.albums.push(createdAlbum);
    return createdAlbum;
  }

  findAll() {
    return this.localDb.albums;
  }

  findOne(id: string) {
    const album = this.localDb.albums.find((album) => album.id === id);
    if (album) {
      return album;
    } else {
      throw new NotFoundException();
    }
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = this.localDb.albums.findIndex(
      (album) => album.id === id,
    );
    if (albumIndex > -1) {
      this.localDb.albums[albumIndex] = {
        ...this.localDb.albums[albumIndex],
        ...updateAlbumDto,
      };
      return this.localDb.albums[albumIndex];
    } else {
      throw new NotFoundException();
    }
  }

  remove(id: string) {
    const albumIndex = this.localDb.albums.findIndex(
      (album) => album.id === id,
    );
    if (albumIndex > -1) {
      return (this.localDb.albums = this.localDb.albums.filter(
        (album) => album.id !== id,
      ));
    } else {
      throw new NotFoundException();
    }
  }
}
