import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateFavoriteTrackDto {
  @IsUUID()
  id: string;
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist
  @IsOptional()
  @IsString()
  albumId: string | null; // refers to Album
  @IsNumber()
  duration: number; // integer number
}
