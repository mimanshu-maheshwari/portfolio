import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  // main page and path for compoenents
  { path: 'about', component: AboutComponent },
  { path: '', pathMatch: 'full', redirectTo: '/about' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'publications', component: PublicationsComponent },
  { path: 'contact', component: ContactComponent },
  // for any unknown path redirect to home page
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
