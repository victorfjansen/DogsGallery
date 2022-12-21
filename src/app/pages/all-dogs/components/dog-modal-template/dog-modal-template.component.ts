import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DogViewModel } from 'src/shared/models';
import { FavoriteDogStore } from 'src/shared';
import { ModalComponent } from 'src/shared/components/modal/modal.component';

@Component({
  selector: 'dog-modal-template',
  templateUrl: './dog-modal-template.component.html',
  styleUrls: ['./dog-modal-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogModalTemplateComponent implements OnDestroy, OnInit {
  @ViewChild('modal') modal: ModalComponent | undefined;
  @Input() selectedDog: DogViewModel;

  isFavorite: boolean;

  unsubscribe$: Subject<void>;

  constructor(
    private dogStore: FavoriteDogStore,
    private changeDetectionRef: ChangeDetectorRef
  ) {
    this.selectedDog = {
      imageUrl: '',
      lifeSpan: '',
      name: '',
      origin: '',
      temperament: '',
    };
    this.isFavorite = false;
    this.unsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.dogStore
      .getFavoriteDogList()
      ?.pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: this.handleIsFavorite.bind(this),
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  toggleVisibility(dog: DogViewModel): void {
    this.selectedDog = dog;
    this.modal?.toggleVisibility();
    this.changeDetectionRef.detectChanges();
  }

  private handleIsFavorite(dogList: DogViewModel[]): void {
    const hasFavorite = dogList.filter(
      (storeDog) => storeDog.name === this.selectedDog.name
    );
    hasFavorite.length ? (this.isFavorite = true) : (this.isFavorite = false);
  }
}
