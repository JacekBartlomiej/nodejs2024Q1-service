import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TrackCreateInput) {
    return this.prisma.track.create({
      data,
    });
  }

  findAll() {
    return this.prisma.track.findMany();
  }

  findOne(id: string) {
    return this.prisma.track.findUnique({
      where: { id },
    });
  }

  update(id: string, data: Prisma.TrackUpdateInput) {
    return this.prisma.artist.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    this.removeTrackFromFavorites(id);
    return this.prisma.track.delete({
      where: {
        id,
      },
    });
  }

  private async removeTrackFromFavorites(id: string) {
    const favorites = await this.prisma.getFavorites();
    if (favorites) {
      const updatedTrackIds = favorites.trackIds.filter(
        (trackId) => trackId !== id,
      );

      // Update the Favorites record
      await this.prisma.favorites.update({
        where: { id: favorites.id },
        data: { trackIds: updatedTrackIds },
      });
    }
  }
}
