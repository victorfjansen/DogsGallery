import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ModalComponent, DogViewModel, FavoriteDogStore } from 'src/shared';

@Component({
  selector: 'list-modal-template',
  templateUrl: './list-modal-template.component.html',
  styleUrls: ['./list-modal-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListModalTemplateComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal: ModalComponent | undefined;
  dogList: DogViewModel[];

  unsubscribe$: Subject<void>;

  constructor(
    private dogStore: FavoriteDogStore,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.dogList = [];
    this.unsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.getDogList();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  toggleVisibility(): void {
    this.modal?.toggleVisibility();
    this.changeDetectorRef.detectChanges();
  }

  getDogList(): void {
    this.dogStore
      .getFavoriteDogList()
      ?.pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.dogList = data;
        },
      });
  }
}
