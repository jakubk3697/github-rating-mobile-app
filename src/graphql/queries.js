import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
        cursor
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
query Repository($id: ID!) {
  repository(id: $id) {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
      reviews {
        edges {
          node {
          id
          text
          rating
          createdAt
            user {
            id
            username
          }
        }
      }
    }
  }
}
`;

export const GET_CURRENT_USER = gql`
  query Me($includeReviews: Boolean!) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id  
          rating
          text
          createdAt
          repository {
            id
            fullName
          }
        }
      }
    }
  }
}
`;

