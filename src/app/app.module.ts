import { APP_BASE_HREF } from '@angular/common';
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
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { HeatmapComponent } from './components/profiles/leetcode/heatmap/heatmap.component';
import { LeetcodeComponent } from './components/profiles/leetcode/leetcode.component';
import { UserProfileComponent } from './components/profiles/leetcode/user-profile/user-profile.component';
import { UserStatisticsComponent } from './components/profiles/leetcode/user-statistics/user-statistics.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { MaterialModule } from './modules/material.module';
import { ThemeService } from './services/theme.service';
import { SnakecasePipe } from './pipes/snakecase.pipe';
import { KebabcasePipe } from './pipes/kebabcase.pipe';
import { environment } from './../environments/environment';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink } from '@apollo/client/core';
import { SubmissionsComponent } from './components/profiles/leetcode/submissions/submissions.component';
import { DoughnutChartComponent } from './components/shared/charts/doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './components/shared/charts/pie-chart/pie-chart.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

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
    SnakecasePipe,
    KebabcasePipe,
    SubmissionsComponent,
    DoughnutChartComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    BaseChartDirective,
  ],
  providers: [
    provideZoneChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    { provide: APP_BASE_HREF, useValue: '/portfolio' },
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      const basic = setContext((operation, context) => ({
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }));
      return {
        link: ApolloLink.from([basic, httpLink.create({ uri: environment.leetcodeUrl })]),
        cache: new InMemoryCache(),
      };
    }),
    ThemeService,
    provideCharts(withDefaultRegisterables()),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
