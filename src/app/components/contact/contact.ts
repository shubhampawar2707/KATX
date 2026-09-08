import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactRequest } from '../../models/contact.model';
import { EmailService } from '../../services/email.service';
import { EnquiryService } from '../../services/enquiry.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  minDate = new Date().toISOString().split('T')[0];
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  submitErrorMessage = 'Something went wrong while sending your request.';

  services = [
    'Termite Control',
    'Cockroach Control',
    'Ant Control',
    'Spider Control',
    'Bed Bug Treatment',
    'Rodent Control',
    'Bird Proofing',
    'Termite Inspection',
    'Pest Identification',
    'Integrated Pest Management',
    'Scheduled Servicing',
    'Stored Product Pest Control',
    'Hospital Pest Management',
    'Hotel Pest Management',
    'Kitchen & Food Area Care',
    'Preventive Service Plans',
    'Daily Office Cleaning',
    'Deep Cleaning Services',
    'Washroom Sanitization',
    'Carpet & Upholstery Cleaning',
    'Glass & Window Cleaning',
  ];

  areas = ['Warje', 'Kothrud', 'Baner', 'Aundh', 'Wakad', 'Hinjewadi', 'Pimpri', 'Chinchwad', 'Mumbai', 'Nashik', 'Raigad', 'Chhatrapati Sambhajinagar'];

  constructor(
    private readonly fb: FormBuilder,
    private readonly emailService: EmailService,
    private readonly enquiryService: EnquiryService,
    private readonly toastService: ToastService,
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-()\s]{10,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      service: ['', [Validators.required]],
      serviceOther: [''],
      area: ['', [Validators.required]],
      areaOther: [''],
      preferredDate: [''],
      preferredTime: [''],
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const selectedService = this.enquiryService.consumeSelectedService();
    if (selectedService) {
      this.contactForm.patchValue({ service: selectedService });
    }
  }

  onSubmit(): void {
    const serviceIsOther = this.contactForm.value.service === 'Other';
    const areaIsOther = this.contactForm.value.area === 'Other';

    if (this.contactForm.invalid || (serviceIsOther && !this.contactForm.value.serviceOther?.trim()) || (areaIsOther && !this.contactForm.value.areaOther?.trim())) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = false;
    this.submitSuccess = false;
    this.submitErrorMessage = 'Something went wrong while sending your request.';

    const payload: ContactRequest = {
      fullName: this.contactForm.value.fullName,
      phone: this.contactForm.value.phone,
      email: this.contactForm.value.email,
      service: serviceIsOther ? this.contactForm.value.serviceOther : this.contactForm.value.service,
      area: areaIsOther ? this.contactForm.value.areaOther : this.contactForm.value.area,
      preferredDate: this.contactForm.value.preferredDate,
      preferredTime: this.contactForm.value.preferredTime,
      message: this.contactForm.value.message,
      submittedAt: new Date().toISOString(),
    };

    this.emailService
      .sendContactEmail(payload)
      .then(() => {
        this.toastService.show('Your contact request was submitted successfully.');
        this.contactForm.reset();
      })
      .catch((error: Error) => {
        this.submitError = true;
        this.submitErrorMessage = error.message || this.submitErrorMessage;
      })
      .finally(() => {
        this.isSubmitting = false;
      });
  }
}
