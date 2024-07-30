import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlaceService } from 'src/places/place.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';

@ApiTags('places')
@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiOperation({ summary: 'Get all places by category with short info' })
  @Get('category/:category')
  findShortByCategory(@Param('category') category: string) {
    return this.placeService.findShortByCategory(category);
  }

  @ApiOperation({ summary: 'Get full place info by id' })
  @Get(':id')
  findFull(@Param('id') id: string) {
    return this.placeService.findFull(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add a place to favorites' })
  @Post(':id/favorite')
  addFavorite(@Param('id') placeId: string, @Request() req: any) {
    const userId = req.user.id;  // Получаем userId из JWT токена
    return this.placeService.addFavorite(+placeId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add a rating to a place' })
  @Post(':id/rating')
  addRating(@Param('id') placeId: string, @Body('rating') ratingValue: number, @Request() req: any) {
    const userId = req.user.id;  // Получаем userId из JWT токена
    return this.placeService.addRating(+placeId, ratingValue, userId);
  }
}