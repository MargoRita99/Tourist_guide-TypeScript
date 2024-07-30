import { Module } from '@nestjs/common';
import { RouteController } from 'src/routes/route.controller';
import { RouteService } from 'src/routes/route.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'src/places/place.entity';
import { User } from 'src/users/user.entity';
import { Favorite } from 'src/favorites/favorite.entity';
import {Rating} from 'src/ratings/rating.entity';
import {Route} from 'src/routes/route.entity';

@Module({
  controllers: [RouteController],
  providers: [RouteService],
  imports: [TypeOrmModule.forFeature([User, Place, Favorite, Rating, Route])],
})
export class RouteModule {}