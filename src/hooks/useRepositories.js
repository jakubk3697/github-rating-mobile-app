/* GraphQL */
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderBy = "CREATED_AT", orderDirection = "DESC", searchKeyword = "") => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection,
      searchKeyword
    },
    fetchPolicy: "cache-and-network",
  });

  return { repositories: data?.repositories, error, loading };
};

export default useRepositories;
