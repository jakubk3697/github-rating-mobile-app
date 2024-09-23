import React from "react";
import { useParams, useNavigate } from "react-router-native";
import { useQuery, useMutation } from "@apollo/client";
import useRepository from "../hooks/useRepository";
import { DELETE_REVIEW } from "../graphql/mutations";
import RepositoryItem from "./RepositoryItem";
import { View, StyleSheet, Text, FlatList, Button, Alert } from "react-native";

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
  nameText: {
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  viewReviewBtn: {
    backgroundColor: "#0366d6",
    color: "#fff",
  },
  deleteReviewBtn: {
    backgroundColor: "#d73a4a",
    color: "#fff",
  },
  buttonText: {
    color: "#fff",
    padding: 10,
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

export const ReviewItem = ({ buttons = false, item, refetch }) => {
  const { id, user, createdAt, rating, text, repository } = item.node;
  const formattedDate = formatDate(createdAt);
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const triggerAlert = (deleteReviewId) =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: () => handleDeleteReview(deleteReviewId) },
      ]
    );

  const handleDeleteReview = async (deleteReviewId) => {
    try {
      const response = await deleteReview({
        variables: {
          deleteReviewId,
        },
      });

      if (!response?.data?.deleteReview) {
        throw new Error("Failed to delete review. Please try again.");
      }

      if (refetch) {
        await refetch();
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      Alert.alert("Error", "Failed to delete review. Please try again.");
    }
  };

  return (
    <View style={styles.reviewItemBox}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
      <View style={styles.contentContainer}>
        {user?.username ? (
          <Text style={styles.nameText}>{user.username}</Text>
        ) : (
          <Text style={styles.nameText}>{repository.fullName}</Text>
        )}
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.reviewText}>{text}</Text>
        {buttons && (
          <View style={styles.buttonContainer}>
            <Button
              title="View Repository"
              onPress={() => navigate(`/repository/${repository?.id}`)}
              color="#0366d6"
            />
            <Button
              title="Delete Review"
              onPress={() => triggerAlert(id)}
              color="#d73a4a"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data, error, loading, fetchMore } = useRepository({
    id,
    first: 3,
  });

  const onEndReach = () => {
    fetchMore();
  };

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
        onEndReached={onEndReach}
      />
    </View>
  );
};

export default SingleRepository;
