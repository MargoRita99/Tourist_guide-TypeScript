import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Place } from 'src/places/place.entity';
import { Route } from 'src/routes/route.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.favorites)
  user: User;

  @ManyToOne(() => Place, { nullable: true })
  place: Place;

  @ManyToOne(() => Route, { nullable: true })
  route: Route;
}