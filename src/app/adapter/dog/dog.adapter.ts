import { DogDto } from 'src/app/dto';
import { DogSnackbarViewModel } from 'src/app/models';

export class DogAdapter {
  static getDogSnackbarData(dogDto: DogDto[]): DogSnackbarViewModel[] {
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
