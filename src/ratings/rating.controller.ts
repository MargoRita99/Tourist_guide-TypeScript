import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RatingService } from 'src/ratings/rating.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Body, Controller, Delete, Param, Post, UseGuards, Request} from '@nestjs/common';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Rate or update rating for a place' })
  @Post(':placeId')
  ratePlace(
    @Param('placeId') placeId: string,
    @Body('rating') ratingValue: number,
    @Request() req: any  // Получаем объект запроса
  ) {
    const userId = req.user.id;  // Получаем userId из JWT токена
    return this.ratingService.ratePlace(userId, +placeId, ratingValue);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove rating from a place' })
  @Delete(':placeId')
  removeRating(
    @Param('placeId') placeId: string,
    @Request() req: any  // Получаем объект запроса
  ) {
    const userId = req.user.id;  // Получаем userId из JWT токена
    return this.ratingService.removeRating(userId, +placeId);
  }
} 