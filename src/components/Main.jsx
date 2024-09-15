import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import SingleRepository from "./SingleRepository";
import SignIn from "../views/SignIn";
import SignUp from "../views/SIgnUp";
import CreateReviewForm from "../views/CreateReview";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reviews/add" element={<CreateReviewForm />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
      </Routes>
    </View>
  );
};

export default Main;
