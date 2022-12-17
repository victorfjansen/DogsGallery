import { Component, Input } from '@angular/core';
import { DogSnackbarViewModel } from 'src/app/models';

@Component({
  selector: 'dog-card-component',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss'],
})
export class DogCardComponent {
  @Input() dogObject: DogSnackbarViewModel;

  constructor() {
    this.dogObject = {
      imageUrl: '',
      lifeSpan: '',
      name: '',
      origin: '',
      temperament: '',
    };
  }
}
