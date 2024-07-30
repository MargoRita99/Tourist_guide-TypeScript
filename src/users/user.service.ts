import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteDto } from 'src/favorites/dto/incomplete-favorite.dto';
import { RegistrationDto } from 'src/users/dto/registration.dto';
import { User } from 'src/users/user.entity';
import { RouteDto } from 'src/routes/dto/incomplete-route.dto';
import { UserDto } from 'src/users/dto/incomplete-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

    // Регистрация пользователя
  async registerUser(userData: RegistrationDto): Promise<UserDto> {
    // Хэширование пароля
    const hashedPassword = await this.hashPassword(userData.password);
    // Создание нового пользователя на основе данных из DTO
    const newUser = this.userRepository.create({
      surname: userData.surname,
      name: userData.name,
      patronymic: userData.patronymic,
      email: userData.email,
      telephone: userData.telephone,
      password: hashedPassword, 
    });

    // Сохранение нового пользователя в базе данных
    const savedUser = await this.userRepository.save(newUser);
    return this.toDto(savedUser);
  }
  // Хэширование пароля
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Определяет сложность хэширования
    return await bcrypt.hash(password, saltRounds);
  }

  // Сравнение пароля
  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Поиск пользователя по ID
  async findUserById(userId: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['routes', 'favorites', 'favorites.place', 'favorites.route'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.toDto(user);
  }

  // Поиск пользователя по email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Преобразование сущности User в UserDto
  private toDto(user: User): UserDto {
    // Создание списков ID мест и маршрутов
    const placeIds = user.favorites.filter(fav => fav.place).map(fav => fav.place.id);
    const routeIds = user.favorites.filter(fav => fav.route).map(fav => fav.route.id);
    return {
      id: user.id,
      surname: user.surname,
      name: user.name,
      patronymic: user.patronymic,
      email: user.email,
      telephone: user.telephone,
      routes: user.routes.map(route => ({
        id: route.id,
        name: route.name,
        polyline: route.polyline,
      } as RouteDto)),
      favorites: [{
        id: user.id,
        placeId: placeIds,
        routeId: routeIds,
      } as FavoriteDto],
    };
  }

  // Обновление данных пользователя
  async updateUser(userId: number, updateData: Partial<User>): Promise<UserDto> {
    await this.userRepository.update(userId, updateData);
    const updatedUser = await this.userRepository.findOne({ where: { id: userId } });
    return this.toDto(updatedUser);
  }

  // Удаление пользователя
  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}