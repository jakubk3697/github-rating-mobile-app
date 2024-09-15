import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const response = await mutate({
      variables: {
        repositoryName,
        ownerName,
        rating: parseInt(rating, 10),
        text,
      }
    });

    return response;
  };

  return [createReview, result];
};

export default useCreateReview;