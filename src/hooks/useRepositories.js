/* GraphQL */
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ first, orderBy = "CREATED_AT", orderDirection = "DESC", searchKeyword = "" }) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: {
      first,
      orderBy,
      orderDirection,
      searchKeyword,
    },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        first,
        orderBy,
        orderDirection,
        searchKeyword,
      },
    });
  };

  return {
    repositories: data?.repositories,
    error,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
