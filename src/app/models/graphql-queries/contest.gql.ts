import { gql } from 'apollo-angular';

export const CONTEST = gql`
  query getUserContestRanking($username: String!) {
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
        name
      }
    }
    userContestRankingHistory(username: $username) {
      attended
      rating
      ranking
      trendDirection
      problemsSolved
      totalProblems
      finishTimeInSeconds
      contest {
        title
        startTime
      }
    }
  }
`;
