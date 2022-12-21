import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs';

import { DogViewModel } from 'src/shared';
import { NOTIFIER_TYPES, PageState } from '../../enums';
import { DogService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  state: PageState;
  dogShowcaseList: DogViewModel[];

  constructor(
    private dogService: DogService,
    private notifierService: NotifierService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.state = PageState.LOADING;
    this.dogShowcaseList = [];
  }

  ngOnInit(): void {
    this.getDogList();
  }

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

  private handleDogSuccess(dogData: DogViewModel[]): void {
    if (!dogData.length) {
      this.state = PageState.NO_DATA;
      return;
    }
    this.dogShowcaseList = dogData;
    this.state = PageState.DEFAULT;
  }

  private handleDogError(error: Error): void {
    this.dogShowcaseList = [];
    this.state = PageState.NO_DATA;
    this.notifierService.notify(NOTIFIER_TYPES.ERROR, error.message);
  }
}
