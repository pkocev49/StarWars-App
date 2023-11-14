import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Person } from '../../interfaces/person.interface';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.css'],
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
export class PeopleCardComponent implements OnInit {
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
  @Input() person: Person = {} as Person;
}
