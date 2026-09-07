export interface ContactRequest {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  area: string;
  preferredDate?: string;
  preferredTime?: string;
  message: string;
  submittedAt: string;
}
