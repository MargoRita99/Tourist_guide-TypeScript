import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Favorite } from 'src/favorites/favorite.entity';
import { Place } from 'src/places/place.entity';
import { Rating } from 'src/ratings/rating.entity';
import { PlaceDto } from 'src/places/dto/incomplete-place.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}
  
  async findShortByCategory(category: string): Promise<PlaceDto[]> {
    const places = await this.placeRepository.find({
      where: { category },
      select: ['id', 'category', 'name', 'imageUrl', 'shortDescription'],
    });

    // Формируем DTO объекты
    const place: PlaceDto[] = places.map(place => ({
      id: place.id,
      category: place.category,
      name: place.name,
      imageUrl: place.imageUrl,
      shortDescription: place.shortDescription,
      favoriteId: place.favorites.map(fav => fav.id), // Список ID избранных
      ratingId: place.averageRating, // Используем средний рейтинг, сохраненный в сущности Place
    }));

    return place;
  }

  async findFull(id: number): Promise<Place> {
    return this.placeRepository.findOne({
      where: { id },
      relations: { favorites: true, ratings: true },
    });
  }

  async addFavorite(placeId: number, userId: number): Promise<Favorite> {
    const favorite = this.favoriteRepository.create({ place: { id: placeId }, user: { id: userId } });
    return this.favoriteRepository.save(favorite);
  }

  async addRating(placeId: number, ratingValue: number, userId: number): Promise<Place> {
    const place = await this.placeRepository.findOne({ where: { id: placeId }, relations: ['ratings'] });
    if (!place) {
      throw new Error('Place not found');
    }

    const newRating = this.ratingRepository.create({ rating: ratingValue, place: { id: placeId }, user: { id: userId } });
    await this.ratingRepository.save(newRating);

    const ratings = await this.ratingRepository.find({ where: { place: { id: placeId } } });
    const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;

    place.averageRating = parseFloat(averageRating.toFixed(2)); // Округление до 2 знаков после запятой
    await this.placeRepository.save(place);
    
    return place;
  }
}