import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
    trigger('scrollAnimationTopTwo', [
      state(
        'startTopTwo',
        style({
          opacity: '0',
          transform: 'translateY(-100%)',
        })
      ),
      state(
        'endTopTwo',
        style({
          transform: 'translateY(0)',
        })
      ),
      transition('startTopTwo => endTopTwo', animate('1s')),
    ]),
    trigger('scrollAnimationTopThree', [
      state(
        'startTopThree',
        style({
          opacity: '0',
          transform: 'translateY(-100%)',
        })
      ),
      state(
        'endTopThree',
        style({
          transform: 'translateY(0)',
        })
      ),
      transition('startTopThree => endTopThree', animate('1s')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  constructor(private el: ElementRef) {}
  stateTop = 'startTop';
  stateTopTwo = 'startTopTwo';
  stateTopThree = 'startTopThree';
  @ViewChild('topSection') topSection: ElementRef;
  @ViewChild('topSectionTwo') topSectionTwo: ElementRef;
  @ViewChild('topSectionThree') topSectionThree: ElementRef;

  ngOnInit() {
    window.addEventListener('scroll', () => {
      const topSectionOffset =
        this.topSection.nativeElement.getBoundingClientRect().top;

      const topSectionOffsetTwo =
        this.topSectionTwo.nativeElement.getBoundingClientRect().top;

      const topSectionOffsetThree =
        this.topSectionThree.nativeElement.getBoundingClientRect().top;

      if (topSectionOffset < window.innerHeight) {
        this.stateTop = 'endTop';
      }
      if (topSectionOffsetTwo < window.innerHeight) {
        this.stateTopTwo = 'endTopTwo';
      }
      if (topSectionOffsetThree < window.innerHeight) {
        this.stateTopThree = 'endTopThree';
      }
    });
  }

  welcome: string = 'Welcome to the best Star Wars Fan Page ';
  imgUrl: string = 'https://wallpaperaccess.com/full/424086.jpg';
  secondImgUrl: string =
    'https://wallpaperswide.com/download/star_wars_ships-wallpaper-2560x1600.jpg';
}
