import { ModuleWithProviders, NgModule } from '@angular/core';
import { NG_MIXPANEL_SETTINGS_TOKEN } from './tokens/ng-mixpanel-settings.token';
import { MixpanelSettingsViewModel } from './models/mixpanel-settings.model';
import { NG_MIXPANEL_INITIALIZER_PROVIDER } from './initializers/ng-mixpanel-initializer.initializer';
import { MpEventTriggerDirective } from './directives/mp-event-trigger/mp-event-trigger.directive';
import { MixpanelTrackService } from './services/mixpanel-track.service';

@NgModule({
  declarations: [MpEventTriggerDirective],
  exports: [MpEventTriggerDirective],
  providers: [MixpanelTrackService]
})
export class NgMixpanelModule {
  static forRoot(
    projectToken: string,
    userId: string,
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
            debugMode,
          } as MixpanelSettingsViewModel,
        },
        NG_MIXPANEL_INITIALIZER_PROVIDER,
      ],
    };
  }

  static forChild(): ModuleWithProviders<NgMixpanelModule> {
    return {
      ngModule: NgMixpanelModule,
    }
  }
}
