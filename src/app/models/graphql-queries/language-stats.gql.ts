import { gql } from 'apollo-angular';

export const LANGUAGE_STATS = gql`
  query languageStats($username: String!) {
    matchedUser(username: $username) {
      languageProblemCount {
        languageName
        problemsSolved
      }
    }
  }
`;
