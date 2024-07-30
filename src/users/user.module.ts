import { Module } from '@nestjs/common';
import { UserController } from 'src/users/user.controller';
import { UserService } from 'src/users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'src/places/place.entity';
import { User } from 'src/users/user.entity';
import { Favorite } from 'src/favorites/favorite.entity';
import {Rating} from 'src/ratings/rating.entity';
import {Route} from 'src/routes/route.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, Place, Favorite, Rating, Route])],
})
export class UserModule {}
