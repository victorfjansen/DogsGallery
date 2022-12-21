import { animate, animation, query, stagger, style } from '@angular/animations';

export const fadeSlowDown = animation(
  query(
    ':enter',
    [
      style({ opacity: 0 }),
      stagger(200, animate('0.3s', style({ opacity: 1 }))),
    ],
    { optional: true }
  )
);
