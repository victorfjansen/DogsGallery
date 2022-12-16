import { Component } from '@angular/core';
import { PageState } from 'src/app/enums';
import { DogSnackbarViewModel } from 'src/app/models';
import { DogService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  state: PageState;
  dogShowcaseList: DogSnackbarViewModel[];

  constructor(private dogService: DogService) {
    this.state = PageState.LOADING;
    this.dogShowcaseList = [];
  }

  getDogService(): void {
    this.dogService.getDogList().subscribe({
      next: this.handleDogSuccess.bind(this),
    });
  }

  handleDogSuccess(dogData: DogSnackbarViewModel[]): void {
    if (!dogData.length) {
      this.state = PageState.NO_DATA;
    }
    this.dogShowcaseList = dogData;
    this.state = PageState.DEFAULT;
  }

  handleError(): void {
    this.dogShowcaseList = [];
    this.state = PageState.NO_DATA;
  }
}
