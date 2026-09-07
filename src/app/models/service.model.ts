export interface ServiceItem {
  name: string;
  description: string;
  category: 'Pest Control' | 'Commercial Services' | 'Healthcare & Hospitality' | 'Cleaning Services';
  icon: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  submittedAt?: string;
}
