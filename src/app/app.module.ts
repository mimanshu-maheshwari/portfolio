import { APP_BASE_HREF } from '@angular/common';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  NgModule,
  provideZoneChangeDetection,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InMemoryCache } from '@apollo/client/cache';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { MaterialModule } from './modules/material.module';
import { HomeComponent } from './components/home/home.component';
import { LeetcodeComponent } from './components/profiles/leetcode/leetcode.component';
import { HeatmapComponent } from './components/profiles/leetcode/heatmap/heatmap.component';
import { UserProfileComponent } from './components/profiles/leetcode/user-profile/user-profile.component';
import { UserStatisticsComponent } from './components/profiles/leetcode/user-statistics/user-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    PublicationsComponent,
    ProfilesComponent,
    SidenavListComponent,
    HomeComponent,
    LeetcodeComponent,
    UserStatisticsComponent,
    UserProfileComponent,
    HeatmapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbCarouselModule,
  ],
  providers: [
    provideZoneChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    // { provide: APP_BASE_HREF, useValue: '/portfolio' },
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri: '/leetcode' }), // proxy '/leetcode' to original url
        cache: new InMemoryCache(),
      };
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
