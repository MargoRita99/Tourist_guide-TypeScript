import { Module } from '@nestjs/common';
import { RatingController } from 'src/ratings/rating.controller';
import { RatingService } from 'src/ratings/rating.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'src/places/place.entity';
import { User } from 'src/users/user.entity';
import { Favorite } from 'src/favorites/favorite.entity';
import {Rating} from 'src/ratings/rating.entity';
import {Route} from 'src/routes/route.entity';

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  imports: [TypeOrmModule.forFeature([User, Place, Favorite, Rating, Route])],
})
export class RatingModule {}