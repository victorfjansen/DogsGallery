import { transition, trigger, useAnimation } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { debounceTime, finalize, Subject, takeUntil, tap } from 'rxjs';
import {
  DogRequestParams,
  DogViewModel,
  fadeSlideIn,
  fadeSlowDown,
  PaginationOptions,
} from 'src/shared';

import { NOTIFIER_TYPES } from './../../enums';
import { PageState } from './../../enums/page-state.enum';
import { DogService } from './../../services/dog/dog.service';

@Component({
  selector: 'app-all-dogs',
  templateUrl: './all-dogs.component.html',
  styleUrls: ['./all-dogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade-down', [transition('void => *', useAnimation(fadeSlowDown))]),
    trigger('fade-left', [transition('void => *', useAnimation(fadeSlideIn))]),
  ],
})
export class AllDogsComponent implements OnInit, OnDestroy {
  //define as instâncias do componente
  state: PageState;
  pageState: typeof PageState;

  nameSearchForm: FormControl<string>;
  paginationOptions: PaginationOptions;

  dogShowcaseList: DogViewModel[];
  dogShowcaseByName: DogViewModel[];

  unsubscribe$: Subject<void>;

  constructor(
    private dogService: DogService,
    private notifierService: NotifierService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    //cria valores pras instancias
    this.state = PageState.LOADING;
    this.dogShowcaseList = [];
    this.dogShowcaseByName = [];
    this.pageState = PageState;
    this.paginationOptions = {
      current: 1,
      total: 11,
    };
    this.nameSearchForm = new FormControl();
    this.unsubscribe$ = new Subject();
  }

  // quando iniciar, pega a lista de dogs existentes com as opções de paginação padrões
  ngOnInit(): void {
    this.getDogList(this.paginationOptions);
    this.handleNameSearch();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // define o trackBy dos dogs pra evitar perda na memória de itens já renderizados
  dogTrackBy(_: number, dog: DogViewModel): string {
    return dog.name;
  }

  // se a paginação mudar, vai fazer uma nova request com os novos dados
  handleChangePage(event: number): void {
    this.paginationOptions.current = event;
    this.getDogList(this.paginationOptions);
  }

  //cria uma subinscrição pro campo de pesquisa e monitora as alterações. Dado isso, chama a função pra filtrar com os dados já existentes
  private handleNameSearch(): void {
    this.nameSearchForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => (this.state = PageState.LOADING)),
        debounceTime(800)
      )
      .subscribe({
        next: () => this.handleFilterNameChanges(),
      });
  }

  // coloca em lowerCase e tira os espaços
  private trimString(value: string): string {
    return value.toLowerCase().trim();
  }

  // Caso não tenha a lista completa dos dogs, faz a request
  // caso o form não tenha nenhum dado, faz a request
  // caso tenha dados e esteja tentando filtrar normalmente, filtra os dados
  private handleFilterNameChanges(): void {
    !(this.dogShowcaseList.length > 20) && this.getDogList({ limit: 160 });
    if (!this.nameSearchForm.value.length) {
      this.resetShowCase();
      return;
    }

    this.dogShowcaseList.length > 20 && this.filterDogs();
  }

  // reseta showcase pra estado inicial e faz nova request. Assim, o template default é renderizado com os dados de paginação normal.
  private resetShowCase(): void {
    this.dogShowcaseByName = [];
    this.getDogList();
  }

  //filtra os dogs pelo nome, define state como default e renderiza componente
  private filterDogs(): void {
    this.dogShowcaseByName = this.dogShowcaseList.filter((dog) =>
      this.trimString(dog.name).includes(
        this.trimString(this.nameSearchForm.value)
      )
    );
    this.state = PageState.DEFAULT;
    this.changeDetectorRef.detectChanges();
  }

  // pega a LISTA de dogs administrando os parâmetros que vierem
  private getDogList(paginationOptions?: PaginationOptions): void {
    const params: DogRequestParams | undefined = paginationOptions
      ? {
          page: paginationOptions.current,
          limit: paginationOptions.limit || 15,
        }
      : undefined;

    this.state = PageState.LOADING;
    this.dogService
      .getDogList(params)
      .pipe(finalize(() => this.changeDetectorRef.detectChanges()))
      .subscribe({
        next: this.handleDogSuccess.bind(this),
        error: this.handleDogError.bind(this),
      });
  }

  // caso a lista venha com sucesso, coloca no default ou no no-data, renderiza o componente e verifica se tem algum valor no form. Se tiver valores no form, chama o filtro por nome
  private handleDogSuccess(dogData: DogViewModel[]): void {
    if (!dogData.length) this.state = PageState.NO_DATA;
    this.dogShowcaseList = dogData;
    this.state = PageState.DEFAULT;
    this.changeDetectorRef.detectChanges();
    this.nameSearchForm.value && this.handleFilterNameChanges();
  }

  // caso de erro, coloca no no-data e informa o usuário
  private handleDogError(error: Error): void {
    this.dogShowcaseList = [];
    this.state = PageState.NO_DATA;
    this.notifierService.notify(NOTIFIER_TYPES.ERROR, error.message);
  }
}
