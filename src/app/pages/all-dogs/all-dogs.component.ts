import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs';
import { PageState } from 'src/app/enums';
import { DogSnackbarViewModel } from 'src/app/models';
import { DogService } from 'src/app/services';
import { Subject, takeUntil, filter, debounceTime } from 'rxjs';

@Component({
  selector: 'app-all-dogs',
  templateUrl: './all-dogs.component.html',
  styleUrls: ['./all-dogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllDogsComponent implements OnInit {
  state: PageState;
  pageState: typeof PageState;

  nameSearchForm: FormControl<string>;

  dogShowcaseList: DogSnackbarViewModel[];
  dogShowcaseByName: DogSnackbarViewModel[];

  unsubscribe$: Subject<void>;

  constructor(
    private dogService: DogService,
    private notifierService: NotifierService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.state = PageState.LOADING;
    this.dogShowcaseList = [];
    this.dogShowcaseByName = [];
    this.pageState = PageState;
    this.nameSearchForm = new FormControl();
    this.unsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.getDogList();
    this.handleNameSearch();
  }

  protected dogTrackBy(_: number, dog: DogSnackbarViewModel): string {
    return dog.name;
  }

  private handleNameSearch(): void {
    this.nameSearchForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((value) => value.length > 2 || !value.length),
        debounceTime(1000)
      )
      .subscribe({
        next: this.filterByName.bind(this),
      });
  }

  private filterByName(value: string): void {
    this.dogShowcaseByName = this.dogShowcaseList.filter((dog) =>
      dog.name.toLowerCase().trim().includes(value.toLowerCase().trim())
    );
    this.changeDetectorRef.detectChanges();
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

  private handleDogSuccess(dogData: DogSnackbarViewModel[]): void {
    if (!dogData.length) this.state = PageState.NO_DATA;
    this.dogShowcaseList = dogData;
    this.state = PageState.DEFAULT;
  }

  private handleDogError(error: Error): void {
    this.dogShowcaseList = [];
    this.state = PageState.NO_DATA;
    this.notifierService.notify('error', error.message);
  }
}
