import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  // main page and path for compoenents
  { path: '', component: HomeComponent },
  // for any unknown path redirect to home page
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
