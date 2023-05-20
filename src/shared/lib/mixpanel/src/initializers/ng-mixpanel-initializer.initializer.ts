import { DOCUMENT } from '@angular/common';
import { APP_BOOTSTRAP_LISTENER, isDevMode, Provider } from '@angular/core';

import { MixpanelSettingsViewModel } from '../models/mixpanel-settings.model';
import { MixpanelTrackService } from '../services/mixpanel-track.service';
import { NG_MIXPANEL_SETTINGS_TOKEN } from '../tokens/ng-mixpanel-settings.token';

export const NG_MIXPANEL_INITIALIZER_PROVIDER: Provider = {
  provide: APP_BOOTSTRAP_LISTENER,
  multi: true,
  useFactory: MixpanelInitializer,
  deps: [NG_MIXPANEL_SETTINGS_TOKEN, DOCUMENT, MixpanelTrackService],
};

declare var mixpanel: any;

export function MixpanelInitializer(
  settings: MixpanelSettingsViewModel,
  document: Document,
  mixpanelTrack: MixpanelTrackService
) {
  if (!settings.projectToken) {
    if (!isDevMode()) {
      console.error('there is no project code available');
    }
    return;
  }

  if (!settings.userId) {
    if (!isDevMode()) {
      console.error('there is no userId available');
    }
    return;
  }

  if (!document) {
    if (!isDevMode()) {
      console.error(
        'Was not possible to access document Interface. Please make sure this module is running on Browser'
      );
    }
    return;
  }

  if (!settings.uri) {
    if (!isDevMode()) {
      console.error(
        'Was not possible to read URI. Please provide it in Module definition'
      );
    }
    return;
  }

  const script = document.createElement('script');
  script.text = settings.uri;
  const body = document.body;
  body.appendChild(script);

  mixpanel.init(settings.projectToken, { debug: true });
  mixpanelTrack.defineMixpanelInstance(mixpanel);
}
