import { transition, trigger, useAnimation } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { DogViewModel, fadeSlideIn } from 'src/shared';

import { APP_ROUTES, PageState } from '../../../../enums';
import { MixpanelTrackService } from 'src/shared/lib/mixpanel/src/services/mixpanel-track.service';

@Component({
  selector: 'home-dogs-showcase',
  templateUrl: './dogs-showcase.component.html',
  styleUrls: ['./dogs-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [transition('* => *', useAnimation(fadeSlideIn))]),
  ],
})
export class DogsShowcaseComponent {
  @Input() showcaseList: DogViewModel[];
  @Input() selectedDog: DogViewModel;
  @Input() state: PageState;

  pageState: typeof PageState;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private mixpanelService: MixpanelTrackService
  ) {
    this.showcaseList = [];
    this.selectedDog = this.showcaseList[0] || [];
    this.pageState = PageState;
    this.state = PageState.LOADING;
  }

  changeCurrentDog(index: number): void {
    this.selectedDog = this.showcaseList[index];
    this.changeDetectorRef.detectChanges();
  }

  navigateTo(): void {
    this.mixpanelService.track('meu-teste')
    this.router.navigate([APP_ROUTES.ALL_DOGS]);
  }

  dogTrackBy(_: unknown, dog: DogViewModel): string {
    return dog.name;
  }
}
