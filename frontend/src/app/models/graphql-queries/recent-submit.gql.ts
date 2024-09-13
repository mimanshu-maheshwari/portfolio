import { gql } from 'apollo-angular';

export const RECENT_SUBMIT = gql`
  query getRecentSubmissions($username: String!, $limit: Int) {
    recentSubmissionList(username: $username, limit: $limit) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
    }
  }
`;
