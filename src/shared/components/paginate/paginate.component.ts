import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'paginate-component',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginateComponent implements OnChanges {
  @Input() current: number;
  @Input() total: number;

  @Output() changePageEvent: EventEmitter<number>;

  pages: number[] = [];

  constructor() {
    this.current = 0;
    this.total = 0;
    this.pages = [];

    this.changePageEvent = new EventEmitter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['current'] && changes['current'].currentValue) ||
      (changes['total'] && changes['total'].currentValue)
    ) {
      this.pages = this.getPages(this.current, this.total);
    }
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 7) {
      return [...Array(total).keys()].map((x) => ++x);
    }

    if (current > 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }

    return [1, 2, 3, 4, 5, -1, total];
  }
}
