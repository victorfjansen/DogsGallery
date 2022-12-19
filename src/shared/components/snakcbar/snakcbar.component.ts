import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DogViewModel } from 'src/app/models';

@Component({
  selector: 'snackbar-component',
  templateUrl: './snakcbar.component.html',
  styleUrls: ['./snakcbar.component.scss'],
})
export class SnakcbarComponent implements OnInit {
  @Output() clickEvent: EventEmitter<void>;

  @Input() dog: DogViewModel;
  @Input() withFavButton: boolean;

  constructor() {
    this.clickEvent = new EventEmitter();
    this.dog = {
      imageUrl: '',
      lifeSpan: '',
      name: '',
      origin: '',
      temperament: '',
    };

    this.withFavButton = false;
  }

  ngOnInit(): void {}
}
