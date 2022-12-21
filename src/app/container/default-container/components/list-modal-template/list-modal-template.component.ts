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

//componente criado pra armazenar e administrar o template do Modal.
//componente do modal está napasta shared
// componente sendo usado no componente header
@Component({
  selector: 'list-modal-template',
  templateUrl: './list-modal-template.component.html',
  styleUrls: ['./list-modal-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListModalTemplateComponent implements OnInit, OnDestroy {
  //declara instancias e pega referencia do modal
  @ViewChild('modal') modal: ModalComponent | undefined;
  dogList: DogViewModel[];

  unsubscribe$: Subject<void>;

  constructor(
    private dogStore: FavoriteDogStore,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    //define valores default pras instancias do componente
    this.dogList = [];
    this.unsubscribe$ = new Subject();
  }

  //quando inicializar, pega os favorite dogs da store
  ngOnInit(): void {
    this.getDogList();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  //muda a visibilidade do modal e renderiza o componente
  toggleVisibility(): void {
    this.modal?.toggleVisibility();
    this.changeDetectorRef.detectChanges();
  }

  //pega os dogs favoritos da store e atribui a lista própria
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
