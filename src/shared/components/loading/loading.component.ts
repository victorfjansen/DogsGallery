import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'loading-component',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent { }

