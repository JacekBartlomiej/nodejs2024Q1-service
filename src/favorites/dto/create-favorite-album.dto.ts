import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateFavoriteAlbumDto {
  @IsUUID()
  id: string;
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist
}
