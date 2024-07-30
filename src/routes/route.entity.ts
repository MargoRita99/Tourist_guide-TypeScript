import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  polyline: string; // Сохранение данных о маршруте в виде полилинии

  @ManyToOne(() => User, user => user.routes)
  user: User;
}