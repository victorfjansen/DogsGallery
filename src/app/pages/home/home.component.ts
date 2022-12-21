import { transition, trigger, useAnimation } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs';
import { DogViewModel, fadeSlideIn } from 'src/shared';

import { NOTIFIER_TYPES, PageState } from '../../enums';
import { DogService } from '../../services';

//apresenta o componente no método OnPush
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [transition('void => *', useAnimation(fadeSlideIn))]),
  ],
})
export class HomeComponent implements OnInit {
  state: PageState;
  dogShowcaseList: DogViewModel[];
  //define instancias do componente
  constructor(
    private dogService: DogService,
    private notifierService: NotifierService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.state = PageState.LOADING;
    this.dogShowcaseList = [];
  }

  //quando inicializar, chama função pra pegar a lsita de dogs formatada
  ngOnInit(): void {
    this.getDogList();
  }

  // seta como loading enquanto não finalizar e chama o serviço
  private getDogList(): void {
    this.state = PageState.LOADING;
    this.dogService
      .getDogList()
      .pipe(finalize(() => this.changeDetectorRef.detectChanges()))
      .subscribe({
        next: this.handleDogSuccess.bind(this),
        error: this.handleDogError.bind(this),
      });
  }

  //caso tenha sucesso, define como DEFAULT
  private handleDogSuccess(dogData: DogViewModel[]): void {
    if (!dogData.length) {
      this.state = PageState.NO_DATA;
      return;
    }
    this.dogShowcaseList = dogData;
    this.state = PageState.DEFAULT;
  }

  //caso de erro, notifica e define como nenhum dado
  private handleDogError(error: Error): void {
    this.dogShowcaseList = [];
    this.state = PageState.NO_DATA;
    this.notifierService.notify(NOTIFIER_TYPES.ERROR, error.message);
  }
}
