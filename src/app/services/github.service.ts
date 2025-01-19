import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GitRepos, GitUser } from '../models/github/git-user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly USERS: string = 'users';
  private readonly REPOS = 'repos';
  private http: HttpClient = inject(HttpClient);
  constructor() {}

  getUserDetails(username: string): Observable<GitUser> {
    return this.http.get<GitUser>(
      `${environment.githubBaseUrl}/${this.USERS}/${username}`,
    );
  }

  getUserRepos(username: string): Observable<Array<GitRepos>> {
    return this.http.get<Array<GitRepos>>(
      `${environment.githubBaseUrl}/${this.USERS}/${username}/${this.REPOS}`,
    );
  }
}
