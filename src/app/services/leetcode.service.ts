import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CONTEST } from '../models/graphql-queries/contest.gql';
import { DAILY_PROBLEM } from '../models/graphql-queries/daily-problem.gql';
import { LANGUAGE_STATS } from '../models/graphql-queries/language-stats.gql';
import { GET_PROFILE } from '../models/graphql-queries/leetcode-profile.gql';
import { UserData } from '../models/leetcode-user-profile.model';
import { ApolloQueryResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class LeetcodeService {
  constructor(private readonly apollo: Apollo) {}

  getProfile(username: string): Observable<ApolloQueryResult<UserData>> {
    return this.apollo.watchQuery<UserData>({
      query: GET_PROFILE,
      variables: { username },
    }).valueChanges;
  }

  getContest(username: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: CONTEST,
      variables: { username },
    }).valueChanges;
  }

  getDailyProblem(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: DAILY_PROBLEM,
    }).valueChanges;
  }

  getLanguageStats(username: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: LANGUAGE_STATS,
      variables: { username },
    }).valueChanges;
  }
}
