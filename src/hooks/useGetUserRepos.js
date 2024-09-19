/* GraphQL */
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const useGetUserRepos = () => {
  const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  return { reviews: data?.me?.reviews, error, loading, refetch };
};

export default useGetUserRepos;
