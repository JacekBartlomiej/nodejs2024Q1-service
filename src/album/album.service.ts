import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { randomUUID } from 'crypto';
import { localDb } from 'src/localDb';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = {
      id: randomUUID(),
      ...createAlbumDto,
    };
    localDb.albums.push(createdAlbum);
    return createdAlbum;
  }

  findAll() {
    return localDb.albums;
  }

  findOne(id: string) {
    const album = localDb.albums.find((album) => album.id === id);
    if (album) {
      return album;
    } else {
      throw new NotFoundException();
    }
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = localDb.albums.findIndex((album) => album.id === id);
    if (albumIndex > -1) {
      localDb.albums[albumIndex] = {
        ...localDb.albums[albumIndex],
        ...updateAlbumDto,
      };
      return localDb.albums[albumIndex];
    } else {
      throw new NotFoundException();
    }
  }

  remove(id: string) {
    const albumIndex = localDb.albums.findIndex((album) => album.id === id);
    if (albumIndex > -1) {
      this.removeAlbumFromTracks(id);
      this.removeAlbumFromFavorites(id);
      return (localDb.albums = localDb.albums.filter(
        (album) => album.id !== id,
      ));
    } else {
      throw new NotFoundException();
    }
  }

  private removeAlbumFromTracks(id: string): void {
    localDb.tracks = localDb.tracks.map((track) => {
      if (track.albumId === id) {
        return {
          ...track,
          albumId: null,
        };
      } else {
        return track;
      }
    });
  }

  private removeAlbumFromFavorites(id: string) {
    localDb.favorites.albums = localDb.favorites.albums.filter(
      (favAlbumId) => favAlbumId !== id,
    );
  }
}
