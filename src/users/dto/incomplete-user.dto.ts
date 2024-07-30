import { FavoriteDto } from 'src/favorites/dto/incomplete-favorite.dto';
import { RouteDto } from 'src/routes/dto/incomplete-route.dto';

export class UserDto {
  id: number;
  surname: string;
  name: string;
  patronymic: string;
  email: string;
  telephone: string;
  routes: RouteDto[];
  favorites: FavoriteDto[];
  }