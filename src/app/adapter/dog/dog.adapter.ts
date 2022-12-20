import { DogDto } from 'src/app/dto';
import { DogViewModel } from 'src/shared/models';

export class DogAdapter {
  static getDogSnackbarData(dogDto: DogDto[]): DogViewModel[] {
    return [...dogDto].map((dog) => {
      return {
        name: dog.name,
        imageUrl: dog.image.url,
        origin: dog.origin,
        lifeSpan: dog.life_span,
        temperament: dog.temperament,
      };
    });
  }
}
