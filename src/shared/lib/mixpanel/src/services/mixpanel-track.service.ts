import { Injectable } from '@angular/core';
import { MixpanelInstanceViewModel } from '../models/mixpanel-instance.model';

@Injectable({ providedIn: 'root' })
export class MixpanelTrackService {
  private mixpanelInstance: MixpanelInstanceViewModel = {
    track: () => null,
  };

  defineMixpanelInstance(mixpanel: MixpanelInstanceViewModel): void {
    this.mixpanelInstance = mixpanel;
  }
}
