import { animate, animation, style } from '@angular/animations';

export const fadeSlideIn = animation([
    style({ opacity: 0, transform: 'translateX(-2px)' }),
    animate('0.4s', style({ opacity: 1, transform: 'translateX(0px)' })),
]);
