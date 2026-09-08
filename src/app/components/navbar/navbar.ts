import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent implements OnDestroy {
  navItems = [
    { label: 'Home', href: '/home' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Why Choose Us', href: '/why-choose-us' },
    { label: 'Contact', href: '/contact' },
    { label: 'Reviews', href: '/reviews' },
  ];

  isMenuOpen = false;
  private readonly navigationSubscription: Subscription;

  constructor(private readonly router: Router) {
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
