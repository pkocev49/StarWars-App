import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Planet } from '../../interfaces/planets.interface';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-planet-card',
  templateUrl: './planet-card.component.html',
  styleUrls: ['./planet-card.component.css'],
  animations: [
    trigger('scrollAnimationTop', [
      state(
        'startTop',
        style({
          opacity: '0',
          transform: 'translateY(-100%)',
        })
      ),
      state(
        'endTop',
        style({
          transform: 'translateY(0)',
        })
      ),
      transition('startTop => endTop', animate('1s')),
    ]),
  ],
})
export class PlanetCardComponent implements OnInit {
  stateTop = 'startTop';
  @ViewChild('topSection') topSection: ElementRef;

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const topSectionOffset =
        this.topSection.nativeElement.getBoundingClientRect().top;
      if (topSectionOffset < window.innerHeight) {
        this.stateTop = 'endTop';
      }
    });
  }
  @Input() planet: Planet = {} as Planet;
}
