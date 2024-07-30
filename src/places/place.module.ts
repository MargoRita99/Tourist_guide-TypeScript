import { Module } from '@nestjs/common';
import { PlaceController } from 'src/places/place.controller';
import { PlaceService } from 'src/places/place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'src/places/place.entity';
import { User } from 'src/users/user.entity';
import { Favorite } from 'src/favorites/favorite.entity';
import {Rating} from 'src/ratings/rating.entity';
import {Route} from 'src/routes/route.entity';

@Module({
  controllers: [PlaceController],
  providers: [PlaceService],
  imports: [TypeOrmModule.forFeature([User, Place, Favorite, Rating, Route])],
})
export class PlaceModule {}