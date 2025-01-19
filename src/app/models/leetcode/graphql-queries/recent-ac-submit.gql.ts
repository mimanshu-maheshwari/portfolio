import { gql } from 'apollo-angular';

export const RECENT_AC_SUBMIT = gql`
  query getACSubmissions($username: String!, $limit: Int) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
    }
  }
`;
