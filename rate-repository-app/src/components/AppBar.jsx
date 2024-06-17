import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to="/">
            <Text style={styles.pressableText}>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable>
          <Link to="/signin">
            <Text style={styles.pressableText}>Sign in</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;
