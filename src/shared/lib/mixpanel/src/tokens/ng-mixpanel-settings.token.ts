import { InjectionToken } from '@angular/core';
import { MixpanelSettingsViewModel } from '../models/mixpanel-settings.model';

export const NG_MIXPANEL_SETTINGS_TOKEN =
  new InjectionToken<MixpanelSettingsViewModel>('ng-mixpanel-settings-token', {
    factory: () => ({
      projectToken: '',
      userId: '',
      debugMode: false,
    }),
  });
