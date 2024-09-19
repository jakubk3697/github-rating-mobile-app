import { FlatList, View, StyleSheet, Text } from "react-native";
import { ReviewItem } from "../components/SingleRepository";
import useGetUserRepos from "../hooks/useGetUserRepos";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const MyReviewsContainer = ({ reviews, refetch }) => {
  return (
    <FlatList
      data={reviews?.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem item={item} buttons={true} refetch={refetch} />
      )}
    />
  );
};

const MyReviews = () => {
  const { reviews, error, loading, refetch } = useGetUserRepos();

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loading}>
        <Text>No data found...</Text>
      </View>
    );
  }

  return <MyReviewsContainer reviews={reviews} refetch={refetch} />;
};

export default MyReviews;
