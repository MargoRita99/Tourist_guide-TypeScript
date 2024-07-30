import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Route} from 'src/routes/route.entity';
import {Favorite} from 'src/favorites/favorite.entity';
import {Rating} from 'src/ratings/rating.entity';

@Entity('users') 
export class User {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column() 
  surname: string;

  @Column()
  name: string;

  @Column()
  patronymic: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @OneToMany(() => Route, route => route.user)
  routes: Route[];

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Rating, rating => rating.user)
  ratings: Rating[];
}
