import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'yellow-button-component',
  templateUrl: './yellow-button.component.html',
  styleUrls: ['./yellow-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YellowButtonComponent {
  @Output() clickEvent: EventEmitter<void>;
  @Input() content: string;

  constructor() {
    this.content = 'Default Button';
    this.clickEvent = new EventEmitter();
  }
}
