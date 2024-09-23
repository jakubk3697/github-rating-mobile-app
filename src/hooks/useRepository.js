/* GraphQL */
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = ({ id, first }) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables: {
      id,
      first,
    },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.repository?.reviews?.pageInfo?.endCursor,
        first,
      },
    });
  };

  return {
    data,
    error,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepository;
