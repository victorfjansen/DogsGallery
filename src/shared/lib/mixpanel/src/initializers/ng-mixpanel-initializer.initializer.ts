import { DOCUMENT } from '@angular/common';
import { APP_BOOTSTRAP_LISTENER, isDevMode, Provider } from '@angular/core';
import * as mixpanel from 'mixpanel-browser';

import { MixpanelSettingsViewModel } from '../models/mixpanel-settings.model';
import { NG_MIXPANEL_SETTINGS_TOKEN } from '../tokens/ng-mixpanel-settings.token';

export const NG_MIXPANEL_INITIALIZER_PROVIDER: Provider = {
  provide: APP_BOOTSTRAP_LISTENER,
  multi: true,
  useFactory: MixpanelInitializer,
  deps: [NG_MIXPANEL_SETTINGS_TOKEN, DOCUMENT],
};

export function MixpanelInitializer(
  settings: MixpanelSettingsViewModel,
  document: Document,
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

  mixpanel.init(settings.projectToken, { debug: settings.debugMode });
}
