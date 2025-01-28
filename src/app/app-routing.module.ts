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
  { path: 'about', component: AboutComponent, data: { routeIdx: 0 } },
  { path: '', pathMatch: 'full', redirectTo: '/about' },
  { path: 'profiles', component: ProfilesComponent, data: { routeIdx: 1 } },
  { path: 'projects', component: ProjectsComponent, data: { routeIdx: 2 } },
  {
    path: 'publications',
    component: PublicationsComponent,
    data: { routeIdx: 3 },
  },
  { path: 'contact', component: ContactComponent, data: { routeIdx: 4 } },
  // for any unknown path redirect to home page
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      enableViewTransitions: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
