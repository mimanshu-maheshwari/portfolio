import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GET_PROFILE } from '../models/graphql-queries/leetcode-profile.gql';

@Injectable({
  providedIn: 'root',
})
export class LeetcodeService {
  constructor(private readonly apollo: Apollo) {}

  getProfile(username: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_PROFILE,
      variables: { username },
    }).valueChanges;
  }
}
