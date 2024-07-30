import { Module } from '@nestjs/common';
import { FavoriteModule } from 'src/favorites/favorite.module';
import { PlaceModule } from 'src/places/place.module';
import { RatingModule } from 'src/ratings/rating.module';
import { RouteModule } from 'src/routes/route.module';
import { UserModule } from 'src/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    FavoriteModule,
    PlaceModule,
    RatingModule,
    RouteModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'education', 
      password: 'password', 
      database: 'tourist',
      host: 'localhost', 
      synchronize: false, 
      logging: 'all', 
      entities: ['dist/**/*.entity{.ts,.js}'], 
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}