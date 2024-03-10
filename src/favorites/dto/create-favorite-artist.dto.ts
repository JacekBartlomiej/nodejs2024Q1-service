import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateFavoriteArtistDto {
  @IsUUID()
  id: string;
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
