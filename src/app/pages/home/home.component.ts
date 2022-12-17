import { NotifierService } from 'angular-notifier';
import {
  Component,
  ChangeDetectorRef,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PageState } from 'src/app/enums';
import { DogSnackbarViewModel } from 'src/app/models';
import { DogService } from 'src/app/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  state: PageState;
  dogShowcaseList: DogSnackbarViewModel[];

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

  getDogList(): void {
    this.state = PageState.LOADING;
    this.dogService
      .getDogList()
      .pipe(finalize(() => this.changeDetectorRef.detectChanges()))
      .subscribe({
        next: this.handleDogSuccess.bind(this),
        error: this.handleDogError.bind(this),
      });
  }

  handleDogSuccess(dogData: DogSnackbarViewModel[]): void {
    if (!dogData.length) this.state = PageState.NO_DATA;
    this.dogShowcaseList = dogData;
    this.state = PageState.DEFAULT;
  }

  handleDogError(error: Error): void {
    this.dogShowcaseList = [];
    this.state = PageState.NO_DATA;
    this.notifierService.notify('error', error.message);
  }
}
