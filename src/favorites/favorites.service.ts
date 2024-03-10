import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { localDb } from 'src/localDb';

@Injectable()
export class FavoritesService {
  findAll() {
    const allFavs = Object.fromEntries(
      Object.entries(localDb.favorites).map(([key, value]) => [
        key,
        value.map((id) => {
          return localDb[key].find((item) => item.id === id);
        }),
      ]),
    );
    console.log(JSON.stringify(allFavs));
    return allFavs;
  }

  addTrack(id: string) {
    const trackIndex = localDb.tracks.findIndex((track) => track.id === id);
    if (trackIndex > -1) {
      return localDb.favorites.tracks.push(localDb.tracks[trackIndex].id);
    } else {
      throw new UnprocessableEntityException();
    }
  }

  removeTrack(id: string) {
    const trackIndex = localDb.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );
    if (trackIndex > -1) {
      return (localDb.favorites.tracks = localDb.favorites.tracks.filter(
        (trackId) => trackId !== id,
      ));
    } else {
      throw new NotFoundException();
    }
  }

  addAlbum(id: string) {
    const albumIndex = localDb.albums.findIndex((album) => album.id === id);
    if (albumIndex > -1) {
      return localDb.favorites.albums.push(localDb.albums[albumIndex].id);
    } else {
      throw new UnprocessableEntityException();
    }
  }

  removeAlbum(id: string) {
    const albumIndex = localDb.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );
    if (albumIndex > -1) {
      return (localDb.favorites.albums = localDb.favorites.albums.filter(
        (albumId) => albumId !== id,
      ));
    } else {
      throw new NotFoundException();
    }
  }

  addArtist(id: string) {
    const artistIndex = localDb.artists.findIndex((artist) => artist.id === id);
    if (artistIndex > -1) {
      return localDb.favorites.artists.push(localDb.artists[artistIndex].id);
    } else {
      throw new UnprocessableEntityException();
    }
  }

  removeArtist(id: string) {
    const artistIndex = localDb.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (artistIndex > -1) {
      return (localDb.favorites.artists = localDb.favorites.artists.filter(
        (artistId) => artistId !== id,
      ));
    } else {
      throw new NotFoundException();
    }
  }
}
