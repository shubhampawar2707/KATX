import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { FooterComponent } from './components/footer/footer';
import { NavbarComponent } from './components/navbar/navbar';
import { EmailService } from './services/email.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  isLeadModalOpen = true;
  isLeadSubmitting = false;
  leadError = '';
  isHomeRoute = true;

  leadForm = {
    name: '',
    phone: '',
    email: '',
    service: '',
    serviceOther: '',
    location: '',
  };

  constructor(
    private readonly router: Router,
    private readonly emailService: EmailService,
    public readonly toastService: ToastService,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.isHomeRoute = (event as NavigationEnd).urlAfterRedirects === '/home';
      });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeLeadModal(): void {
    this.isLeadModalOpen = false;
  }

  submitLeadForm(): void {
    const hasRequiredFields = this.leadForm.name && this.leadForm.phone && this.leadForm.email && this.leadForm.service && this.leadForm.location;
    const hasOtherService = this.leadForm.service !== 'Other' || this.leadForm.serviceOther.trim();

    if (!hasRequiredFields || !hasOtherService) {
      return;
    }

    this.isLeadSubmitting = true;
    this.leadError = '';

    this.emailService.sendQuickEnquiry(this.leadForm)
      .then(() => {
        this.toastService.show('Your enquiry was submitted successfully.');
        this.closeLeadModal();
        this.leadForm = { name: '', phone: '', email: '', service: '', serviceOther: '', location: '' };
      })
      .catch((error: Error) => {
        this.leadError = error.message || 'Unable to send your enquiry. Please call us directly.';
      })
      .finally(() => {
        this.isLeadSubmitting = false;
      });
  }
}

