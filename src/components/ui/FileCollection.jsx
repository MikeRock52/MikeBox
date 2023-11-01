import React from "react";
import { Collection, ThemeProvider } from "@aws-amplify/ui-react";
import theme from "./theme";
import "./files.css";
import FileCard from "./FileCard";

function FileCollection({ files, fileInfo }) {
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
            <FileCard key={index} file={file} index={index} fileInfo={fileInfo} />
          )}
        </Collection>
      </ThemeProvider>
    </div>
  );
}

export default FileCollection;
