import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";
// import useAuthStorage from "./useAuthStorage";
// import { useApolloClient } from "@apollo/client";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({ username, password }) => {
    const response = await mutate({ variables: { username, password } });

    return response;
  };

  return [signUp, result];
};

export default useSignUp;
