export interface MixpanelInstanceViewModel {
  track: (eventId: string, mixpanelData: unknown) => void;
}
