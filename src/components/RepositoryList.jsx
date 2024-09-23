import { useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

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
  searchInput: {
    marginTop: 16,
    marginBottom: 16,
  },
  picker: {
    backgroundColor: "#f0f0f0",
    marginBottom: 16,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onOrderChange,
  orderBy,
  orderDirection,
  searchKeyword,
  onSearchChange,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories?.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onSearchChange}
        value={searchKeyword}
        style={styles.searchInput}
      />
      <Picker
        selectedValue={`${orderBy}:${orderDirection}`}
        onValueChange={(itemValue) => {
          const [newOrderBy, newOrderDirection] = itemValue.split(":");
          onOrderChange(newOrderBy, newOrderDirection);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Latest repositories" value="CREATED_AT:DESC" />
        <Picker.Item
          label="Highest rated repositories"
          value="RATING_AVERAGE:DESC"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="RATING_AVERAGE:ASC"
        />
      </Picker>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        onEndReached={onEndReach}
      />
    </>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword] = useDebounce(searchKeyword, 1000);

  const { repositories, fetchMore, error, loading } = useRepositories({
    first: 4,
    orderBy,
    orderDirection,
    searchKeyword: debouncedKeyword,
  });

  const onEndReach = () => {
    fetchMore();
  };

  const handleOrderChange = (newOrderBy, newOrderDirection) => {
    setOrderBy(newOrderBy);
    setOrderDirection(newOrderDirection);
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
        <Text>No data found...</Text>
      </View>
    );
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      onOrderChange={handleOrderChange}
      orderBy={orderBy}
      orderDirection={orderDirection}
      searchKeyword={searchKeyword}
      onSearchChange={setSearchKeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
