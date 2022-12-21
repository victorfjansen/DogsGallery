import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DogViewModel } from 'src/shared';
import { Router } from '@angular/router';
import { APP_ROUTES, PageState } from '../../../../enums';

@Component({
  selector: 'home-dogs-showcase',
  templateUrl: './dogs-showcase.component.html',
  styleUrls: ['./dogs-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogsShowcaseComponent {
  @Input() showcaseList: DogViewModel[];
  @Input() selectedDog: DogViewModel;
  @Input() state: PageState;

  pageState: typeof PageState;

  constructor(private router: Router) {
    this.showcaseList = [];
    this.selectedDog = this.showcaseList[0] || [];
    this.pageState = PageState;
    this.state = PageState.LOADING;
  }

  changeCurrentDog(index: number): void {
    this.selectedDog = this.showcaseList[index];
  }

  navigateTo(): void {
    this.router.navigate([APP_ROUTES.ALL_DOGS]);
  }

  dogTrackBy(_: unknown, dog: DogViewModel): string {
    return dog.name;
  }
}
