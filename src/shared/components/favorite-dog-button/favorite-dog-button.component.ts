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
  //cria instancias e define o DOG pra ser recebido como input property
  @Input() dog: DogViewModel;

  //o faHeart é do fontAwesome
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

  //toda vez que houver alteração, vai verificar se é favorito pra poder renderizar como vermelho
  ngOnChanges(): void {
    this.verifyIsDogFavorite();
  }

  // finaliza a inscrição
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // verifica o estado atual do componente pra poder decidir se vai remover dos favoritos ou adicionar dos favoritos
  toggleFavoriteState(): void {
    this.isDogFavorite
      ? this.dogStore.removeFavoriteDog(this.dog.name)
      : this.setFavoriteDog();
  }

  // define o dog como favorito (chamando a store) e notifica ao usuário
  private setFavoriteDog(): void {
    this.dogStore.setFavoriteDog(this.dog);
    this.notifierService.notify(
      'success',
      'adicionado aos favoritos com sucesso!'
    );
  }

  //pega na store a lista de dogs e verifica se o dog recebido pela input property faz parte dela
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
