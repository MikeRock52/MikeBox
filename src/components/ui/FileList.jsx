import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import {
  Collection,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import theme from "./theme";
import "./files.css";
import FileCard from "./FileCard";

function FileList({ upload, folder }) {
  const [fileInfo, setFileInfo] = useState([]);
  const [files, setFiles] = useState([]);

  async function fetchAllFiles() {
    const { results } = await Storage.list("", { level: "private" });
    setFileInfo(results);
    const allFiles = await Promise.all(
      results.map(async (file) => {
        return await Storage.get(file.key, { level: "private" });
      })
    );
    setFiles(allFiles);
  }

  useEffect(() => {
    fetchAllFiles();
  }, [upload, folder]);

  console.log(fileInfo);

  return (
    <div className="mb-12 mt-20">
      <ThemeProvider theme={theme} colorMode="dark">
        <Collection
          type="list"
          items={files}
          padding="2rem"
          margin="0 auto"
          justifyContent="center"
          gap="large"
          direction="row"
          wrap="wrap"
          isPaginated
          itemsPerPage={10}
          isSearchable
          searchPlaceholder="Type to search file..."
        >
          {(file, index) => (
            <FileCard file={file} index={index} fileInfo={fileInfo} />
          )}
        </Collection>
      </ThemeProvider>
    </div>
  );
}

export default FileList;
