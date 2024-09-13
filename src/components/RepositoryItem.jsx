import React from "react";
import { View, Image, StyleSheet, Pressable, Linking } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  topContainer: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  infoContainer: {
    paddingLeft: 10,
    flex: 1,
  },
  fullName: {
    fontWeight: "bold",
  },
  description: {
    color: "#586069",
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: "white",
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  statsContainer: {
    flexDirection: "row",
    paddingTop: 10,
  },
  statItem: {
    flexDirection: "row",
    marginRight: 15,
  },
  statText: {
    marginLeft: 5,
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  githubButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const roundNumber = (number) => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`;
  }
  return number;
};

const RepositoryItem = ({ item, showGitHubLink = false }) => {
  const navigate = useNavigate();
  const stargazersCount = roundNumber(item.stargazersCount);
  const forksCount = roundNumber(item.forksCount);

  const handlePress = (id) => {
    if (!showGitHubLink) {
      navigate(`/repository/${id}`);
    }
  };

  const openGitHub = () => {
    Linking.openURL(item.url);
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <Pressable onPress={() => handlePress(item.id)}>
        <View style={styles.topContainer}>
          <Image
            style={styles.image}
            source={{ uri: item.ownerAvatarUrl }}
            testID="avatarImage"
          />
          <View style={styles.infoContainer}>
            <Text fontWeight="bold" style={styles.fullName} testID="fullName">
              {item.fullName}
            </Text>
            <Text style={styles.description} testID="description">
              {item.description}
            </Text>
            <Text style={styles.language} testID="language">
              {item.language}
            </Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text>Stars:</Text>
            <Text style={styles.statText} testID="stargazersCount">
              {stargazersCount}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text>Forks:</Text>
            <Text style={styles.statText} testID="forksCount">
              {forksCount}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text>Reviews:</Text>
            <Text style={styles.statText} testID="reviewCount">
              {item.reviewCount}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text>Rating:</Text>
            <Text style={styles.statText} testID="ratingAverage">
              {item.ratingAverage}
            </Text>
          </View>
        </View>
      </Pressable>
      {showGitHubLink && (
        <Pressable onPress={openGitHub} style={styles.githubButton}>
          <Text style={styles.githubButtonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
