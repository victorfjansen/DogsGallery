import { ModuleWithProviders, NgModule } from '@angular/core';
import { NG_MIXPANEL_SETTINGS_TOKEN } from './tokens/ng-mixpanel-settings.token';
import { MixpanelSettingsViewModel } from './models/mixpanel-settings.model';
import { NG_MIXPANEL_INITIALIZER_PROVIDER } from './initializers/ng-mixpanel-initializer.initializer';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
})
export class NgMixpanelModule {
  static forRoot(
    projectToken: string,
    userId: string,
    uri: string,
    debugMode: boolean = false
  ): ModuleWithProviders<NgMixpanelModule> {
    return {
      ngModule: NgMixpanelModule,
      providers: [
        {
          provide: NG_MIXPANEL_SETTINGS_TOKEN,
          useValue: {
            projectToken,
            userId,
            uri,
            debugMode,
          } as MixpanelSettingsViewModel,
        },
        NG_MIXPANEL_INITIALIZER_PROVIDER,
      ],
    };
  }
}
