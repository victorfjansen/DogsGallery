import { transition, trigger, useAnimation } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { debounceTime, finalize, Subject, takeUntil, tap } from 'rxjs';
import { DogRequestParams, DogViewModel, fadeSlideIn, fadeSlowDown, PaginationOptions } from 'src/shared';

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

  ngOnInit(): void {
    this.getDogList(this.paginationOptions);
    this.handleNameSearch();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  dogTrackBy(_: number, dog: DogViewModel): string {
    return dog.name;
  }

  handleChangePage(event: number): void {
    this.paginationOptions.current = event;
    this.getDogList(this.paginationOptions);
  }

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

  private trimString(value: string): string {
    return value.toLowerCase().trim();
  }

  private handleFilterNameChanges(): void {
    !(this.dogShowcaseList.length > 20) && this.getDogList({ limit: 200 });
    if (!this.nameSearchForm.value.length) {
      this.resetShowCase();
      return;
    }

    this.dogShowcaseList.length > 20 && this.filterDogs();
  }

  private resetShowCase(): void {
    this.dogShowcaseByName = [];
    this.getDogList();
  }

  private filterDogs(): void {
    this.dogShowcaseByName = this.dogShowcaseList.filter((dog) =>
      this.trimString(dog.name).includes(
        this.trimString(this.nameSearchForm.value)
      )
    );
    this.state = PageState.DEFAULT;
    this.changeDetectorRef.detectChanges();
  }

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

  private handleDogSuccess(dogData: DogViewModel[]): void {
    if (!dogData.length) this.state = PageState.NO_DATA;
    this.dogShowcaseList = dogData;
    this.state = PageState.DEFAULT;
    this.changeDetectorRef.detectChanges();
    this.nameSearchForm.value && this.handleFilterNameChanges();
  }

  private handleDogError(error: Error): void {
    this.dogShowcaseList = [];
    this.state = PageState.NO_DATA;
    this.notifierService.notify(NOTIFIER_TYPES.ERROR, error.message);
  }
}
