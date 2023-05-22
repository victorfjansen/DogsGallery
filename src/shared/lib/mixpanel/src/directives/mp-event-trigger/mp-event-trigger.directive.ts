import { Directive, HostListener, Input } from '@angular/core';
import { MixpanelTrackService } from '../../services/mixpanel-track.service';

@Directive({
  selector: '[mixpanelTrigger]'
})
export class MpEventTriggerDirective {
  @Input() eventId: string = 'default-event';
  @Input() eventTrackData: unknown = {}

  constructor(private mixpanelTrackService: MixpanelTrackService) { }

  @HostListener('click') handleClick(): void {
    this.mixpanelTrackService.track(this.eventId, this.eventTrackData);
  }
}
