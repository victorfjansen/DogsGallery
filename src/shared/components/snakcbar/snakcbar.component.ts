import { DogViewModel } from '../../models/dog.model';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

// apresenta componente no modo de detecção onPush, onde só será renderizado quando a inputProperty for alterada
@Component({
  selector: 'snackbar-component',
  templateUrl: './snakcbar.component.html',
  styleUrls: ['./snakcbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnakcbarComponent {
  // emissão e recebimento de informações declaradas aqui
  @Output() clickEvent: EventEmitter<void>;

  @Input() dog: DogViewModel;
  @Input() withFavButton: boolean;

  constructor() {
    // inicialização default do componente
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
}
