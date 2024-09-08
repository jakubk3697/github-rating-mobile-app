import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import Constants from "expo-constants";

import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";

const apolloClient = createApolloClient();

export default function App() {
  console.log(Constants.expoConfig.extra);

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
      <StatusBar style="auto" />
    </NativeRouter>
  );
}
