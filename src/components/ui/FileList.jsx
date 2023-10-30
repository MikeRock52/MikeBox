import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import {
  Collection,
  Card,
  Heading,
  Text,
  Flex,
  useTheme,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import theme from "./collectionTheme";

function FileList({ upload }) {
  const [files, setFiles] = useState(null);

  function fetchAllFiles() {
    Storage.list("", { level: "private" }, { pageSize: 2 })
      .then(({ results }) => setFiles(results))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchAllFiles();
  }, [upload]);

  files && console.log(files);

  const { tokens } = useTheme();
  const items = [
    {
      title: "Fiordland National Park",
      description:
        "This national park includes the famous fjords of Milford, Dusky and Doubtful Sounds.",
    },
    {
      title: "Bay of Islands, North Island",
      description:
        "Three hours north of Auckland, this area features over 144 islands to explore.",
    },
    {
      title: "Queenstown, South Island",
      description:
        "This hopping town is New Zealand's adventure capital and is located right on Lake Wakatipu.",
    },
    {
      title: "Queenstown, South Island",
      description:
        "This hopping town is New Zealand's adventure capital and is located right on Lake Wakatipu.",
    },
  ];

  return (
    <div>
      <ThemeProvider theme={theme} colorMode="dark">
        <Collection
          type="list"
          items={items}
          padding="2rem"
          // maxWidth="1100px"
          margin="0 auto"
          justifyContent="center"
          gap="small"
          direction="row"
          wrap="wrap"
          isPaginated
          isSearchable
          searchNoResultsFound={
            <Flex justifyContent="center">
              <Text color="#b91c1c" fontSize="1rem">
                No files found, please try again
              </Text>
            </Flex>
          }
          searchPlaceholder="Type to search file..."
        >
          {(item, index) => (
            <Card
              key={index}
              padding={tokens.space.medium}
              maxWidth="180px"
              fontSize={tokens.fontSizes.xs}
            >
              <Heading level={4}>{item.title}</Heading>
              <Text>{item.description}</Text>
            </Card>
          )}
        </Collection>
      </ThemeProvider>
    </div>
  );
}

export default FileList;
