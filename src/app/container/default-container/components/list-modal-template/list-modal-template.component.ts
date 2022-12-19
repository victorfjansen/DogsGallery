import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DogViewModel } from 'src/app/models';
import { FavoriteDogStore } from 'src/shared';
import { ModalComponent } from 'src/shared/components/modal/modal.component';

@Component({
  selector: 'list-modal-template',
  templateUrl: './list-modal-template.component.html',
  styleUrls: ['./list-modal-template.component.scss'],
})
export class ListModalTemplateComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal: ModalComponent | undefined;
  dogList: DogViewModel[];

  unsubscribe$: Subject<void>;

  constructor(private dogStore: FavoriteDogStore) {
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
