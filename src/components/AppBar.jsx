import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    padding: 10,
    flexDirection: "row",
  },
  pressableText: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    padding: 10,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: false },
  });
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/", { replace: true });
  };

  const addReview = () => {
    navigate("/reviews/add", { replace: true });
  };

  const getMyReviews = () => {
    navigate("/myreviews", { replace: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to="/">
            <Text style={styles.pressableText}>Repositories</Text>
          </Link>
        </Pressable>

        {data?.me ? (
          <>
            <Pressable onPress={addReview}>
              <Text style={styles.pressableText}>Create a review</Text>
            </Pressable>
            <Pressable onPress={getMyReviews}>
              <Text style={styles.pressableText}>My reviews</Text>
            </Pressable>
            <Pressable onPress={signOut}>
              <Text style={styles.pressableText}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable>
              <Link to="/signup">
                <Text style={styles.pressableText}>Sign Up</Text>
              </Link>
            </Pressable>
            <Pressable>
              <Link to="/signin">
                <Text style={styles.pressableText}>Sign In</Text>
              </Link>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
