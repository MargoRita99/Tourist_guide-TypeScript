import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Place } from 'src/places/place.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.ratings)
  user: User;

  @ManyToOne(() => Place, place => place.ratings)
  place: Place;

  @Column('decimal', { precision: 2, scale: 1 })
  rating: number;
}