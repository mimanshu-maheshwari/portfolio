import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AboutMe } from '../models/about-me.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private http = inject(HttpClient);
  constructor() {}

  public getAboutMeDetails(): Observable<AboutMe> {
    return this.http.get<AboutMe>('./jsons/about-me.json');
  }
}
