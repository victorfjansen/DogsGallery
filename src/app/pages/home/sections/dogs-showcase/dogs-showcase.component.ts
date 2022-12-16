import { Component } from '@angular/core';
import { DogViewModel } from 'src/app/models';

@Component({
  selector: 'home-dogs-showcase',
  templateUrl: './dogs-showcase.component.html',
  styleUrls: ['./dogs-showcase.component.scss'],
})
export class DogsShowcaseComponent {
  showcaseList: DogViewModel[];

  constructor() {
    this.showcaseList = [
      {
        id: 'Hylo4Snaf',
        url: 'https://cdn.thedogapi.com/images/Hylo4Snaf.jpeg',
        width: 1200,
        height: 922,
        mime_type: 'image/jpeg',
        breeds: [
          {
            id: 235,
            name: 'Spanish Water Dog',
            weight: ' 30 to 50 pounds',
            height: '16 to 20 inches at the shoulder',
            life_span: '12 to 15 years',
            breed_group: 'Sporting',
          },
        ],
        categories: [],
      },
      {
        id: 'Hylo4Snaf',
        url: 'https://cdn.thedogapi.com/images/Hylo4Snaf.jpeg',
        width: 1200,
        height: 922,
        mime_type: 'image/jpeg',
        breeds: [
          {
            id: 235,
            name: 'Spanish Water Dog',
            weight: ' 30 to 50 pounds',
            height: '16 to 20 inches at the shoulder',
            life_span: '12 to 15 years',
            breed_group: 'Sporting',
          },
        ],
        categories: [],
      },
      {
        id: 'Hylo4Snaf',
        url: 'https://cdn.thedogapi.com/images/Hylo4Snaf.jpeg',
        width: 1200,
        height: 922,
        mime_type: 'image/jpeg',
        breeds: [
          {
            id: 235,
            name: 'Spanish Water Dog',
            weight: ' 30 to 50 pounds',
            height: '16 to 20 inches at the shoulder',
            life_span: '12 to 15 years',
            breed_group: 'Sporting',
          },
        ],
        categories: [],
      },
    ];
  }
}
