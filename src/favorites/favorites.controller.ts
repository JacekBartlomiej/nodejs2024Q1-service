import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteTrackDto } from './dto/create-favorite-track.dto';
import { CreateFavoriteAlbumDto } from './dto/create-favorite-album.dto';
import { CreateFavoriteArtistDto } from './dto/create-favorite-artist.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  createTrack(
    @Param('id') id: string,
    @Body() createFavoriteTrackDto: CreateFavoriteTrackDto,
  ) {
    return this.favoritesService.createTrack(id, createFavoriteTrackDto);
  }

  @Delete('track/:id')
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  createAlbum(
    @Param('id') id: string,
    @Body() createFavoriteAlbumDto: CreateFavoriteAlbumDto,
  ) {
    return this.favoritesService.createAlbum(id, createFavoriteAlbumDto);
  }

  @Delete('album/:id')
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  createArtist(
    @Param('id') id: string,
    @Body() createFavoriteArtistDto: CreateFavoriteArtistDto,
  ) {
    return this.favoritesService.createArtist(id, createFavoriteArtistDto);
  }

  @Delete('artist/:id')
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.removeArtist(id);
  }
}
