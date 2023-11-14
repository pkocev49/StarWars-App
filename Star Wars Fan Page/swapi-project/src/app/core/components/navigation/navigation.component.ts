import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isMobileMenuOpen = false;

  constructor(private router: Router) {
    // Subscribe to router events to close the mobile menu on route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobileMenuOpen) {
        this.toggleMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Close the mobile menu when clicking outside of it
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.contains(event.target as Node)) {
      this.isMobileMenuOpen = false;
    }
  }
}
