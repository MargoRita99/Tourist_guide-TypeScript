import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FavoriteDto } from 'src/favorites/dto/incomplete-favorite.dto';
import { FavoriteService } from 'src/favorites/favorite.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Добавить место в избранное' })
  @Post('place')
  async addPlaceToFavorite(
    @Request() req: any,
    @Body() { placeId }: { placeId: number }
  ) {
    const userId = req.user.id;  // Получаем userId из JWT токена
    return this.favoriteService.addPlaceToFavorite(userId, placeId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Добавить маршрут в избранное' })
  @Post('route')
  async addRouteToFavorite(
    @Request() req: any,
    @Body() { routeId }: { routeId: number }
  ) {
    const userId = req.user.id;  // Получаем userId из JWT токена
    return this.favoriteService.addRouteToFavorite(userId, routeId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить место из избранного' })
  @Delete('place')
  async removePlaceFromFavorite(
    @Request() req: any,
    @Body() { placeId }: { placeId: number }
  ) {
    const userId = req.user.id;  // Получаем userId из JWT токена
    await this.favoriteService.removePlaceFromFavorite(userId, placeId);
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить маршрут из избранного' })
  @Delete('route')
  async removeRouteFromFavorite(
    @Request() req: any,
    @Body() { routeId }: { routeId: number }
  ) {
    const userId = req.user.id;  // Получаем userId из JWT токена
    await this.favoriteService.removeRouteFromFavorite(userId, routeId);
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить все избранные элементы пользователя' })
  @Get()
  async getUserFavorites(@Request() req: any): Promise<FavoriteDto> {
    const userId = req.user.id;  // Получаем userId из JWT токена
    return this.favoriteService.getUserFavorites(userId);
  }
}