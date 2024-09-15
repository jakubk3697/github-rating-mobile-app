import React from "react";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import { View, StyleSheet, Text, FlatList } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewItemBox: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0366d6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  ratingText: {
    color: "#0366d6",
    fontSize: 18,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
  },
});

const formatDate = (date) => {
  const createDate = new Date(date);
  const formattedDate = `${createDate.getDate().toString().padStart(2, "0")}.${(
    createDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${createDate.getFullYear()}`;

  return formattedDate;
};

const ReviewItem = ({ item }) => {
  const { user, createdAt, rating, text } = item.node;
  const formattedDate = formatDate(createdAt);

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewItemBox}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.reviewText}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

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
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RepositoryItem item={data.repository} showGitHubLink={true} />
      <FlatList
        data={data.repository.reviews.edges}
        renderItem={({ item }) => <ReviewItem item={item} />}
        keyExtractor={(item) => item.node.id.toString()}
      />
    </View>
  );
};

export default SingleRepository;
