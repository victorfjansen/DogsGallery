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

// componente criado em cima do componente default de MODAL (está na shared). Apenas pra definir um template customizável
// Usado no dog-card (componente de cima pertencente a mesma página)
@Component({
  selector: 'dog-modal-template',
  templateUrl: './dog-modal-template.component.html',
  styleUrls: ['./dog-modal-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogModalTemplateComponent implements OnDestroy, OnInit {
  //cria instancias do componente e pega a referencia do modal contido no template
  @ViewChild('modal') modal: ModalComponent | undefined;
  @Input() selectedDog: DogViewModel;

  isFavorite: boolean;

  unsubscribe$: Subject<void>;

  constructor(
    private dogStore: FavoriteDogStore,
    private changeDetectionRef: ChangeDetectorRef
  ) {
    //defiine valores default pras instancias
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

  // quando iniciar, verifica se o dog recebido pela prop vai estar na lista de favoritos
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

  // troca a visibilidade do modal e define o dog do modal
  toggleVisibility(dog: DogViewModel): void {
    this.selectedDog = dog;
    this.modal?.toggleVisibility();
    this.changeDetectionRef.detectChanges();
  }

  // verifica se o dog do modal esta na lista de favoritos
  private handleIsFavorite(dogList: DogViewModel[]): void {
    const hasFavorite = dogList.filter(
      (storeDog) => storeDog.name === this.selectedDog.name
    );
    hasFavorite.length ? (this.isFavorite = true) : (this.isFavorite = false);
  }
}
