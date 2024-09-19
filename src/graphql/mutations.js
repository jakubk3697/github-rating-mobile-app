import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id    
      username
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
    createReview(review: { repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text }) {
      id
      repository {
        id
        fullName
      }
      rating
      text
      createdAt
      user {
        id
        username
      }
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;