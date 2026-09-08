import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about';
import { ContactComponent } from './components/contact/contact';
import { ServicesComponent } from './components/services/services';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us';
import { HomePageComponent } from './pages/home-page/home-page';
import { ReviewsPageComponent } from './pages/reviews/reviews';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'why-choose-us', component: WhyChooseUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'reviews', component: ReviewsPageComponent },
  { path: '**', redirectTo: 'home' },
];
