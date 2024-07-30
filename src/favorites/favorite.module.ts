import { Module } from '@nestjs/common';
import { FavoriteController } from 'src/favorites/favorite.controller';
import { FavoriteService } from 'src/favorites/favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'src/places/place.entity';
import { User } from 'src/users/user.entity';
import { Favorite } from 'src/favorites/favorite.entity';
import {Rating} from 'src/ratings/rating.entity';
import {Route} from 'src/routes/route.entity';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [TypeOrmModule.forFeature([User, Place, Favorite, Rating, Route])],
})
export class FavoriteModule {}