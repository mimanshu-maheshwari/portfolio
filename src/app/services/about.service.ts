import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AboutMe } from '../models/about-me.model';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private http = inject(HttpClient);
  public aboutMe$: BehaviorSubject<AboutMe | undefined> = new BehaviorSubject<
    AboutMe | undefined
  >(undefined);
  constructor() {}

  public getAboutMeDetails(): Observable<AboutMe> {
    return this.http.get<AboutMe>('./jsons/about-me.json').pipe(
      tap((value) => {
        console.log(value);
        this.aboutMe$.next(value);
      }),
    );
  }
}
