import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query($first: Int, $after: String, $orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(
      first: $first, 
      after: $after, 
      orderDirection: $orderDirection, 
      orderBy: $orderBy, 
      searchKeyword: $searchKeyword
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
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
  query Repository($id: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
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

