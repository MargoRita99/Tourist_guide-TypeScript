import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Rating} from 'src/ratings/rating.entity';
import {Favorite} from 'src/favorites/favorite.entity';

@Entity('places')
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  fullDescription: string;

  @Column()
  shortDescription: string;

  @Column()
  location: string;

  @Column()
  openingHours: string;

  @Column()
  averagePrice: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  averageRating: number;

  @OneToMany(() => Rating, rating => rating.place)
  ratings: Rating[];

  @OneToMany(() => Favorite, favorite => favorite.place)
  favorites: Favorite[];
}