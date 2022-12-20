import { mockedDogDto } from '../../../shared/mocks';
import { DogAdapter } from './dog.adapter';

describe(DogAdapter.name, () => {
  it(`${DogAdapter.name} should be defined`, () => {
    const instance = new DogAdapter();
    expect(instance).toBeDefined();
  });

  it(`${DogAdapter.name} should return a DogViewModel array from Dto`, () => {
    const result = DogAdapter.getDogSnackbarData([mockedDogDto]);
    console.log(result);
    expect(result).toStrictEqual([
      {
        imageUrl: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
        lifeSpan: '10 - 12 years',
        name: 'Affenpinscher',
        origin: 'Germany, France',
        temperament:
          'Stubborn, Curious, Playful, Adventurous, Active, Fun-loving',
      },
    ]);
  });
});
