import { gql } from 'apollo-angular';

export const TRENDING_DISCUSS = gql`
  query trendingDiscuss($first: Int!) {
    cachedTrendingCategoryTopics(first: $first) {
      id
      title
      post {
        id
        creationDate
        contentPreview
        author {
          username
          isActive
          profile {
            userAvatar
          }
        }
      }
    }
  }
`;
