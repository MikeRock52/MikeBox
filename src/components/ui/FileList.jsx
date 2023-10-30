import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import {
  Collection,
  Card,
  Image,
  Text,
  Flex,
  useTheme,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import theme from "./collectionTheme";
import getThumbnail from "../../utilities";

function FileList({ upload }) {
  const [fileInfo, setFileInfo] = useState([]);
  const [files, setFiles] = useState([]);

  async function fetchAllFiles() {
    const { results } = await Storage.list("", { level: "private" });
    setFileInfo(results);
    const allFiles = await Promise.all(
      results.map(async (file) => {
        // console.log(file.contentType)
        return await Storage.get(file.key, { level: "private" });
      })
    );
    setFiles(allFiles);
  }

  useEffect(() => {
    fetchAllFiles();
  }, [upload]);

  console.log(fileInfo);

  const { tokens } = useTheme();

  return (
    <div className="">
      <ThemeProvider theme={theme} colorMode="dark">
        <Collection
          type="list"
          items={files}
          padding="2rem"
          // maxWidth="1100px"
          margin="0 auto"
          justifyContent="center"
          gap="small"
          direction="row"
          wrap="wrap"
          isPaginated
          isSearchable
          searchPlaceholder="Type to search file..."
        >
          {(file, index) => (
            <div className="relative">
              <Card
                key={index}
                lineHeight="small"
                backgroundColor="transparent"
                variation="elevated"
                width="200px"
                height="200px"
                className="group hover:opacity-75"
              >
                <img
                  src={getThumbnail(fileInfo[index]) || file}
                  alt={fileInfo[index].key}
                  className="h-full w-full"
                />
                <div className="absolute top-0 left-0 opacity-70 h-full w-full bg-lime-200 invisible group-hover:visible" />
                <h4 className="absolute top-0 left-0 ml-3 mt-4 font-bold text-black invisible group-hover:visible">{fileInfo[index].key}</h4>
              </Card>
            </div>
          )}
        </Collection>
      </ThemeProvider>
    </div>
  );
}

export default FileList;
