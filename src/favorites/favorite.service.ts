import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';
import { User } from 'src/users/user.entity';
import { Place } from 'src/places/place.entity';
import { Route } from 'src/routes/route.entity';
import { FavoriteDto } from 'src/favorites/dto/incomplete-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  // Добавление места в избранное
  async addPlaceToFavorite(userId: number, placeId: number): Promise<Favorite> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const place = await this.placeRepository.findOne({ where: { id: placeId } });
    const favorite = this.favoriteRepository.create({ user, place });
    return this.favoriteRepository.save(favorite);
  }

  // Добавление маршрута в избранное
  async addRouteToFavorite(userId: number, routeId: number): Promise<Favorite> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const route = await this.routeRepository.findOne({ where: { id: routeId } });
    const favorite = this.favoriteRepository.create({ user, route });
    return this.favoriteRepository.save(favorite);
  }

  // Удаление места из избранного
  async removePlaceFromFavorite(userId: number, placeId: number): Promise<void> {
    await this.favoriteRepository.delete({ user: { id: userId }, place: { id: placeId } });
  }

  // Удаление маршрута из избранного
  async removeRouteFromFavorite(userId: number, routeId: number): Promise<void> {
    await this.favoriteRepository.delete({ user: { id: userId }, route: { id: routeId } });
  }

  // Получение всех избранных элементов пользователя
  async getUserFavorites(userId: number): Promise<FavoriteDto> {
    const favorites = await this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['place', 'route'],
    });

    // Формируем списки id мест и маршрутов
    const placeIds = favorites.filter(fav => fav.place).map(fav => fav.place.id);
    const routeIds = favorites.filter(fav => fav.route).map(fav => fav.route.id);

    return {
      id: userId,
      placeId: placeIds,
      routeId: routeIds,
    };
  }
}