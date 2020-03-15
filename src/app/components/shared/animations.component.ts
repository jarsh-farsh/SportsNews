import { Component, OnInit } from '@angular/core';
import { animation, trigger, animateChild, group, transition, animate, style, query, state, keyframes } from '@angular/animations';

export const slideXAndAppear = animation([
  style({ transform: 'translateX({{ from }})', opacity: 0}),
  animate('{{ timing }}', style({ transform: 'translateX(0)', opacity: 1}))
]);

export const slideXAndDisappear = animation([
  animate('{{ timing }}', 
    style ({
      transform: 'translateX({{ to }})', opacity: 0
    })
  )
]);

export const slideYAndAppear = animation([
  style({ transform: 'translateY({{ from }})', opacity: 0}),
  animate('{{ timing }}', style({ transform: 'translateY({{ to }})', opacity: 1}))
]);

export const slideYAndDisappear = animation([
  style({ transform: 'translateY({{ from }})', opacity: 1}),
  animate('{{ timing }}', style({ transform: 'translateY({{ to }})', opacity: 0}))
]);

export const slideHeightOpen = animation([
  style({ height: 0, opacity: 0}),
  animate('{{ timing }}', style({ height: '100%', opacity: 1}))
])

export const slideHeightClose = animation([
  style({ height: '100%', opacity: 1}),
  animate('{{ timing }}', style({ height: 0, opacity: 0}))
])

export const windowOpen = animation([
  animate("250ms ease-in-out", keyframes([
    style({opacity:0, transform: 'scale(.8)'}),
    style({opacity:1, transform: 'scale(1.02)'}),
    style({transform: 'scale(1)'})
  ]))
])

export const windowClose = animation([
  animate('150ms ease', style({opacity:0, transform: 'scale(.8)'}))
])

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css']
})
export class AnimationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
