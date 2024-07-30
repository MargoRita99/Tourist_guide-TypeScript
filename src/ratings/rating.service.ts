import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Place } from 'src/places/place.entity';
import { Rating } from 'src/ratings/rating.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Добавление или обновление оценки
  async ratePlace(userId: number, placeId: number, ratingValue: number): Promise<Rating> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const place = await this.placeRepository.findOne({ where: { id: placeId } });
    if (!user || !place) {
      throw new Error('User or Place not found');
    }

    // Найти существующую оценку, если она есть
    let rating = await this.ratingRepository.findOne({
      where: { user: { id: userId }, place: { id: placeId } },
    });

    if (rating) {
      // Обновление существующей оценки
      rating.rating = ratingValue;
    } else {
      // Создание новой оценки
      rating = this.ratingRepository.create({ rating: ratingValue, user, place });
    }

    return this.ratingRepository.save(rating);
  }

  // Удаление оценки
  async removeRating(userId: number, placeId: number): Promise<void> {
    const rating = await this.ratingRepository.findOne({
      where: { user: { id: userId }, place: { id: placeId } },
    });

    if (rating) {
      await this.ratingRepository.remove(rating);
    }
  }
}