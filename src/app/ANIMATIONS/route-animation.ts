import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [

  transition('* <=> *', [

    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%'
      })
    ], { optional: true }),

    group([

      query(':leave', [
        animate('800ms ease',
          style({
            transform: 'translateX(-40px)',
            opacity: 0
          })
        )
      ], { optional: true }),

      query(':enter', [
        style({
          transform: 'translateX(40px)',
          opacity: 0
        }),
        animate('250ms ease',
          style({
            transform: 'translateX(0)',
            opacity: 1
          })
        )
      ], { optional: true })

    ])

  ])

]);