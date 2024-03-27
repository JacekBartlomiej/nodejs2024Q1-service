import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const favorites = await this.prisma.getFavorites();
    if (favorites) {
      return this.prisma.favorites.findMany();
    }
  }

  async addTrack(id: string) {
    const favorites = await this.prisma.getFavorites();
    if (favorites) {
      const track = await this.prisma.track.findUnique({
        where: { id },
      });
      if (track) {
        return this.prisma.favorites.update({
          where: { id: favorites.id },
          data: { trackIds: { set: [...favorites.trackIds, track.id] } },
        });
      }
    } else {
      throw new UnprocessableEntityException();
    }
  }

  async removeTrack(id: string) {
    const favorites = await this.prisma.getFavorites();
    if (favorites) {
      const track = await this.prisma.track.findUnique({
        where: { id },
      });
      if (track) {
        const updatedTrackIds = favorites.trackIds.filter(
          (trackId) => trackId !== id,
        );
        return this.prisma.favorites.update({
          where: { id: favorites.id },
          data: { trackIds: { set: updatedTrackIds } },
        });
      } else {
        throw new NotFoundException();
      }
    }
  }

  async addAlbum(id: string) {
    const favorites = await this.prisma.getFavorites();
    if (favorites) {
      const track = await this.prisma.album.findUnique({
        where: { id },
      });
      if (track) {
        return this.prisma.favorites.update({
          where: { id: favorites.id },
          data: { albumIds: { set: [...favorites.albumIds, track.id] } },
        });
      }
    } else {
      throw new UnprocessableEntityException();
    }
  }

  async removeAlbum(id: string) {
    const favorites = await this.prisma.getFavorites();
    if (favorites) {
      const track = await this.prisma.album.findUnique({
        where: { id },
      });
      if (track) {
        const updatedAlbumIds = favorites.albumIds.filter(
          (albumId) => albumId !== id,
        );
        return this.prisma.favorites.update({
          where: { id: favorites.id },
          data: { albumIds: { set: updatedAlbumIds } },
        });
      } else {
        throw new NotFoundException();
      }
    }
  }

  async addArtist(id: string) {
    const favorites = await this.prisma.getFavorites();
    if (favorites) {
      const track = await this.prisma.artist.findUnique({
        where: { id },
      });
      if (track) {
        return this.prisma.favorites.update({
          where: { id: favorites.id },
          data: { artistIds: { set: [...favorites.artistIds, track.id] } },
        });
      }
    } else {
      throw new UnprocessableEntityException();
    }
  }

  async removeArtist(id: string) {
    const favorites = await this.prisma.getFavorites();
    if (favorites) {
      const track = await this.prisma.artist.findUnique({
        where: { id },
      });
      if (track) {
        const updatedArtistIds = favorites.artistIds.filter(
          (artistId) => artistId !== id,
        );
        return this.prisma.favorites.update({
          where: { id: favorites.id },
          data: { artistIds: { set: updatedArtistIds } },
        });
      } else {
        throw new NotFoundException();
      }
    }
  }
}
