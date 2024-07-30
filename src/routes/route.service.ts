import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Favorite } from 'src/favorites/favorite.entity';
import { User } from 'src/users/user.entity';
import { Route } from 'src/routes/route.entity';
import { FavoriteService } from 'src/favorites/favorite.service';
import { RouteDto } from 'src/routes/dto/incomplete-route.dto';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteService: FavoriteService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  // Создание нового маршрута
  
  async createRoute(userId: number, routeDto: RouteDto): Promise<Route> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const route = this.routeRepository.create({ ...routeDto, user });
    return this.routeRepository.save(route);
  }

  // Обновление существующего маршрута
  async updateRoute(id: number, routeDto: RouteDto): Promise<Route> {
    const route = await this.routeRepository.findOne({ where: { id } });
    if (!route) {
      throw new Error('Route not found');
    }

    Object.assign(route, routeDto);
    return this.routeRepository.save(route);
  }

  // Удаление маршрута
  async deleteRoute(id: number): Promise<void> {
    await this.routeRepository.delete(id);
  }

  // Получение всех маршрутов пользователя
  async getUserRoutes(userId: number): Promise<Route[]> {
    return this.routeRepository.find({ where: { user: { id: userId } } });
  }

  // Добавление маршрута в избранное
  async addRouteToFavorites(userId: number, routeId: number): Promise<void> {
    await this.favoriteService.addRouteToFavorite(userId, routeId);
  }
}