import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ContactRequest } from '../models/contact.model';

// IMPORTANT:
// Add your EmailJS credentials to src/environments/environment.ts before deployment.
// The keys are intentionally left as placeholders so secrets are not hardcoded in components.

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  async sendQuickEnquiry(payload: {
    name: string;
    phone: string;
    email: string;
    service: string;
    location: string;
  }): Promise<void> {
    await this.sendTemplate({
      customer_name: payload.name,
      customer_phone: payload.phone,
      customer_email: payload.email,
      selected_service: payload.service,
      service_area: payload.location,
      preferred_date: 'Not specified',
      preferred_time: 'Not specified',
      customer_message: 'Submitted through the opening enquiry popup.',
      submission_date: new Date().toISOString(),
      from_name: payload.name,
      from_email: payload.email,
      reply_to: payload.email,
      message: 'Submitted through the opening enquiry popup.',
    });
  }

  async sendContactEmail(payload: ContactRequest): Promise<void> {
    await this.sendTemplate({
      customer_name: payload.fullName,
      customer_phone: payload.phone,
      customer_email: payload.email,
      selected_service: payload.service,
      service_area: payload.area,
      preferred_date: payload.preferredDate || 'Not specified',
      preferred_time: payload.preferredTime || 'Not specified',
      customer_message: payload.message,
      submission_date: payload.submittedAt,
      from_name: payload.fullName,
      from_email: payload.email,
      reply_to: payload.email,
      message: payload.message,
    });
  }

  private async sendTemplate(templateParams: Record<string, string>): Promise<void> {
    const serviceId = environment.emailjs.serviceId;
    const templateId = environment.emailjs.templateId;
    const publicKey = environment.emailjs.publicKey;

    const missingValues = [
      (!serviceId || serviceId.startsWith('YOUR_')) && 'service ID',
      (!templateId || templateId.startsWith('YOUR_')) && 'template ID',
      (!publicKey || publicKey.startsWith('YOUR_')) && 'public key',
    ].filter(Boolean);

    if (missingValues.length > 0) {
      throw new Error(`EmailJS is not configured. Add the ${missingValues.join(', ')} in src/environments/environment.ts.`);
    }

    try {
      const emailjs = await this.loadEmailJs();
      emailjs.init({ publicKey });

      await emailjs.send(serviceId, templateId, templateParams);
      
    } catch (error: any) {
      const reason = error?.text || error?.message || 'EmailJS rejected the request.';
      throw new Error(`EmailJS could not send the enquiry: ${reason}`);
    }
  }

  private async loadEmailJs(): Promise<any> {
    const emailjs = (window as any).emailjs;

    if (emailjs) {
      return emailjs;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.async = true;
    document.body.appendChild(script);

    await new Promise<void>((resolve, reject) => {
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Unable to load EmailJS script.'));
    });

    const loadedEmailJs = (window as any).emailjs;
    if (!loadedEmailJs) {
      throw new Error('EmailJS failed to initialize.');
    }

    return loadedEmailJs;
  }
}
