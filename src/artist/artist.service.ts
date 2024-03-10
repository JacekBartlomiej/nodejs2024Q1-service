import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { randomUUID } from 'crypto';
import { localDb } from 'src/localDb';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const createdArtist = {
      id: randomUUID(),
      ...createArtistDto,
    };
    localDb.artists.push(createdArtist);
    return createdArtist;
  }

  findAll() {
    return localDb.artists;
  }

  findOne(id: string) {
    const artist = localDb.artists.find((artist) => artist.id === id);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException();
    }
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = localDb.artists.findIndex((artist) => artist.id === id);
    if (artistIndex > -1) {
      localDb.artists[artistIndex] = {
        ...localDb.artists[artistIndex],
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      };
      return localDb.artists[artistIndex];
    } else {
      throw new NotFoundException();
    }
  }

  remove(id: string) {
    const artistIndex = localDb.artists.findIndex((artist) => artist.id === id);
    if (artistIndex > -1) {
      const newArtists = localDb.artists.filter((artist) => artist.id !== id);
      localDb.artists = newArtists;
      this.removeArtistFromAlbums(id);
      this.removeArtistFromTracks(id);
      this.removeArtistFromFavorites(id);
      return newArtists;
    } else {
      throw new NotFoundException();
    }
  }

  private removeArtistFromAlbums(id: string): void {
    localDb.albums = localDb.albums.map((album) => {
      if (album.artistId === id) {
        return {
          ...album,
          artistId: null,
        };
      } else {
        return album;
      }
    });
  }

  private removeArtistFromTracks(id: string): void {
    localDb.tracks = localDb.tracks.map((track) => {
      if (track.artistId === id) {
        return {
          ...track,
          artistId: null,
        };
      } else {
        return track;
      }
    });
  }

  private removeArtistFromFavorites(id: string) {
    localDb.favorites.artists = localDb.favorites.artists.filter(
      (favArtistId) => favArtistId !== id,
    );
  }
}
