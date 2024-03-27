import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}
  create(createAlbumDto: CreateAlbumDto) {
    return this.prisma.album.create({
      data: createAlbumDto,
    });
  }

  findAll() {
    return this.prisma.album.findMany();
  }

  findOne(id: string) {
    return this.prisma.album.findUnique({
      where: { id },
    });
  }

  update(id: string, data: Prisma.AlbumUpdateInput) {
    return this.prisma.album.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    this.removeAlbumFromTracks(id);
    this.removeAlbumFromFavorites(id);
    return this.prisma.album.delete({
      where: {
        id,
      },
    });
  }

  private removeAlbumFromTracks(id: string): void {
    this.prisma.track.updateMany({
      where: {
        albumId: id,
      },
      data: {
        albumId: null,
      },
    });
  }

  private async removeAlbumFromFavorites(id: string) {
    const favorites = await this.prisma.getFavorites();
    if (favorites) {
      const updatedAlbumIds = favorites.albumIds.filter(
        (albumId) => albumId !== id,
      );

      await this.prisma.favorites.update({
        where: { id: favorites.id },
        data: { albumIds: updatedAlbumIds },
      });
    }
  }
}
