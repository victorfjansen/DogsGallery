import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { NotifierService } from 'angular-notifier';
import { Subject, takeUntil } from 'rxjs';

import { DogViewModel } from '../../models';
import { FavoriteDogStore } from '../../store';

@Component({
  selector: 'favorite-button-component',
  templateUrl: './favorite-dog-button.component.html',
  styleUrls: ['./favorite-dog-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteButtonComponent implements OnDestroy, OnChanges {
  @Input() dog: DogViewModel;

  faHeart: typeof faHeart;
  isDogFavorite: boolean;

  unsubscribe$: Subject<void>;

  constructor(
    private dogStore: FavoriteDogStore,
    private changeDetectorRef: ChangeDetectorRef,
    private notifierService: NotifierService
  ) {
    this.faHeart = faHeart;
    this.dog = {
      imageUrl: '',
      lifeSpan: '',
      name: '',
      origin: '',
      temperament: '',
    };

    this.isDogFavorite = false;
    this.unsubscribe$ = new Subject();
  }

  ngOnChanges(): void {
    this.verifyIsDogFavorite();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  toggleFavoriteState(): void {
    this.isDogFavorite
      ? this.dogStore.removeFavoriteDog(this.dog.name)
      : this.setFavoriteDog();
  }

  private setFavoriteDog(): void {
    this.dogStore.setFavoriteDog(this.dog);
    this.notifierService.notify(
      'success',
      'adicionado aos favoritos com sucesso!'
    );
  }

  private verifyIsDogFavorite(): void {
    this.dogStore
      .getFavoriteDogList()
      ?.pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: this.handleIsFavorite.bind(this),
      });
  }

  private handleIsFavorite(dogList: DogViewModel[]): void {
    const hasFavorite = dogList.filter(
      (storeDog) => storeDog.name === this.dog.name
    );

    hasFavorite.length
      ? (this.isDogFavorite = true)
      : (this.isDogFavorite = false);

    this.changeDetectorRef.detectChanges();
  }
}
