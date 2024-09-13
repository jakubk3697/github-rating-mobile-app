import React from "react";
import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

const repositories = {
  totalCount: 8,
  pageInfo: {
    hasNextPage: true,
    endCursor:
      "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
  },
  edges: [
    {
      node: {
        id: "jaredpalmer.formik",
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl:
          "https://avatars2.githubusercontent.com/u/4060187?v=4",
      },
      cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
    },
    {
      node: {
        id: "async-library.react-async",
        fullName: "async-library/react-async",
        description: "Flexible promise-based React data loader",
        language: "JavaScript",
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl:
          "https://avatars1.githubusercontent.com/u/54310907?v=4",
      },
      cursor:
        "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    },
  ],
};

describe("RepositoryListContainer", () => {
  it("renders repository information correctly", () => {
    render(<RepositoryListContainer repositories={repositories} />);

    const repositoryItems = screen.getAllByTestId("repositoryItem");

    repositories.edges.forEach((edge, index) => {
      const { node } = edge;
      const repositoryItem = repositoryItems[index];

      const roundNumber = (number) => {
        if (number >= 1000) {
          return `${(number / 1000).toFixed(1)}k`;
        }
        return number.toString();
      };

      expect(within(repositoryItem).getByTestId('fullName')).toHaveTextContent(node.fullName.toString());
      expect(within(repositoryItem).getByTestId('description')).toHaveTextContent(node.description.toString());
      expect(within(repositoryItem).getByTestId('language')).toHaveTextContent(node.language.toString());
      expect(within(repositoryItem).getByTestId('forksCount')).toHaveTextContent(roundNumber(node.forksCount));
      expect(within(repositoryItem).getByTestId('stargazersCount')).toHaveTextContent(roundNumber(node.stargazersCount));
      expect(within(repositoryItem).getByTestId('ratingAverage')).toHaveTextContent(node.ratingAverage.toString());
      expect(within(repositoryItem).getByTestId('reviewCount')).toHaveTextContent(node.reviewCount.toString());
    });
  });
});