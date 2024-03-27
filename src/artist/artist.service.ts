import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Artist, Prisma } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ArtistCreateInput): Promise<Artist> {
    return this.prisma.artist.create({
      data,
    });
  }

  async findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  findOne(id: string) {
    try {
      return this.prisma.artist.findUnique({
        where: { id },
      });
    } catch {
      throw new NotFoundException();
    }
  }

  update(id: string, data: Prisma.ArtistUpdateInput) {
    try {
      return this.prisma.artist.update({
        where: {
          id,
        },
        data,
      });
    } catch {
      throw new NotFoundException();
    }
  }

  remove(id: string) {
    try {
      this.removeArtistFromFavorites(id);
      this.removeArtistFromAlbums(id);
      this.removeArtistFromTracks(id);
      return this.prisma.artist.delete({
        where: {
          id,
        },
      });
    } catch {
      throw new NotFoundException();
    }
  }

  private async removeArtistFromAlbums(id: string) {
    this.prisma.album.updateMany({
      where: {
        artistId: id,
      },
      data: {
        artistId: null,
      },
    });
  }

  private async removeArtistFromTracks(id: string) {
    this.prisma.track.updateMany({
      where: {
        artistId: id,
      },
      data: {
        artistId: null,
      },
    });
  }

  private async removeArtistFromFavorites(id: string) {
    const favorites = await this.prisma.getFavorites();
    if (favorites) {
      const updatedArtisIds = favorites.artistIds.filter(
        (artistId) => artistId !== id,
      );

      // Update the Favorites record
      await this.prisma.favorites.update({
        where: { id: favorites.id },
        data: { artistIds: updatedArtisIds },
      });
    }
  }
}
