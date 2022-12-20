import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

// apresenta o elemento no método de detecção OnPush no qual só será renderizado quando a inputProperty for alterada
@Component({
  selector: 'yellow-button-component',
  templateUrl: './yellow-button.component.html',
  styleUrls: ['./yellow-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YellowButtonComponent {
  // propriedade de emissão (Output()) e de recebimento (Input) de informações
  @Output() clickEvent: EventEmitter<void>;
  @Input() content: string;

  // definindo as propriedades comum valor default na primeira inicialização da instância do componente
  constructor() {
    this.content = 'Default Button';
    this.clickEvent = new EventEmitter();
  }
}
