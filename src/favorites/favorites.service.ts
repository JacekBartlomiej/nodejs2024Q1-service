import { Injectable } from '@nestjs/common';
import { CreateFavoriteTrackDto } from './dto/create-favorite-track.dto';
import { CreateFavoriteAlbumDto } from './dto/create-favorite-album.dto';
import { CreateFavoriteArtistDto } from './dto/create-favorite-artist.dto';
import { localDb } from 'src/localDb';

@Injectable()
export class FavoritesService {
  findAll() {
    return localDb.favorites;
  }

  createTrack(id: string, createFavoriteTrackDto: CreateFavoriteTrackDto) {
    return 'This action adds a new favorite';
  }

  removeTrack(id: string) {
    return `This action removes a #${id} favorite`;
  }

  createAlbum(id: string, createFavoriteAlbumDto: CreateFavoriteAlbumDto) {
    return 'This action adds a new favorite';
  }

  removeAlbum(id: string) {
    return `This action removes a #${id} favorite`;
  }

  createArtist(id: string, createFavoriteArtistDto: CreateFavoriteArtistDto) {
    return 'This action adds a new favorite';
  }

  removeArtist(id: string) {
    return `This action removes a #${id} favorite`;
  }
}
