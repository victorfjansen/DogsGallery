import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DogDto } from 'src/app/dto';

@Component({
  selector: 'home-dogs-showcase',
  templateUrl: './dogs-showcase.component.html',
  styleUrls: ['./dogs-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogsShowcaseComponent {
  showcaseList: DogDto[];
  selectedDog: DogDto;

  constructor() {
    this.showcaseList = [
      {
        weight: {
          imperial: '6 - 13',
          metric: '3 - 6',
        },
        height: {
          imperial: '9 - 11.5',
          metric: '23 - 29',
        },
        id: 1,
        name: 'Affenpinscher',
        bred_for: 'Small rodent hunting, lapdog',
        breed_group: 'Toy',
        life_span: '10 - 12 years',
        temperament:
          'Stubborn, Curious, Playful, Adventurous, Active, Fun-loving',
        origin: 'Germany, France',
        reference_image_id: 'BJa4kxc4X',
        image: {
          id: 'BJa4kxc4X',
          width: 1600,
          height: 1199,
          url: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
        },
      },
      {
        weight: {
          imperial: '6 - 13',
          metric: '3 - 6',
        },
        height: {
          imperial: '9 - 11.5',
          metric: '23 - 29',
        },
        id: 1,
        name: 'Dog2',
        bred_for: 'Small rodent hunting, lapdog',
        breed_group: 'Toy',
        life_span: '10 - 12 years',
        temperament:
          'Stubborn, Curious, Playful, Adventurous, Active, Fun-loving',
        origin: 'Germany, France',
        reference_image_id: 'BJa4kxc4X',
        image: {
          id: 'BJa4kxc4X',
          width: 1600,
          height: 1199,
          url: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
        },
      },
      {
        weight: {
          imperial: '6 - 13',
          metric: '3 - 6',
        },
        height: {
          imperial: '9 - 11.5',
          metric: '23 - 29',
        },
        id: 1,
        name: 'Dog3',
        bred_for: 'Small rodent hunting, lapdog',
        breed_group: 'Toy',
        life_span: '10 - 12 years',
        temperament:
          'Stubborn, Curious, Playful, Adventurous, Active, Fun-loving',
        origin: 'Germany, France',
        reference_image_id: 'BJa4kxc4X',
        image: {
          id: 'BJa4kxc4X',
          width: 1600,
          height: 1199,
          url: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
        },
      },
    ];

    this.selectedDog = this.showcaseList[0];
  }

  changeCurrentDog(index: number): void {
    this.selectedDog = this.showcaseList[index];
  }
}
