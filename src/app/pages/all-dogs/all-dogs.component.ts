import { DogRequestParams } from '../../../shared/models/dog-request-params.model';
import { PaginationOptions } from '../../../shared/models/pagination-options.model';
import { DogService } from './../../services/dog/dog.service';
import { DogViewModel } from '../../../shared/models/dog.model';
import { PageState } from './../../enums/page-state.enum';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-all-dogs',
  templateUrl: './all-dogs.component.html',
  styleUrls: ['./all-dogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: this.filterByName.bind(this),
      });
  }

  private trimString(value: string): string {
    return value.toLowerCase().trim();
  }

  private filterByName(value: string): void {
    this.dogShowcaseByName = this.dogShowcaseList.filter((dog) =>
      this.trimString(dog.name).includes(this.trimString(value))
    );
    if (!value.length) this.dogShowcaseByName = [];
  }

  private getDogList(paginationOptions: PaginationOptions): void {
    const params: DogRequestParams | undefined = paginationOptions
      ? { page: paginationOptions.current, limit: 15 }
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
  }

  private handleDogError(error: Error): void {
    this.dogShowcaseList = [];
    this.state = PageState.NO_DATA;
    this.notifierService.notify('error', error.message);
  }
}
