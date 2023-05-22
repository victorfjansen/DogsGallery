import { Inject, Injectable } from '@angular/core';

import { MixpanelSettingsViewModel } from '../models/mixpanel-settings.model';
import { NG_MIXPANEL_SETTINGS_TOKEN } from '../tokens/ng-mixpanel-settings.token';
import * as mixpanel from 'mixpanel-browser'

@Injectable()
export class MixpanelTrackService {
  constructor(@Inject(NG_MIXPANEL_SETTINGS_TOKEN) private settings: MixpanelSettingsViewModel) { }

  track(eventId: string, trackData?: unknown): void {
    mixpanel.track(eventId, { ...trackData as Object, userId: this.settings.userId });
  }
}
