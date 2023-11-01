import React, { useState } from "react";
import { Collection, ThemeProvider } from "@aws-amplify/ui-react";
import theme from "./theme";
import "./files.css";
import FileCard from "./FileCard";
import { SearchFile } from "../Icons";

function FileCollection({ files, fileInfo }) {
  const [search, setSearch] = useState(false);

  return (
    <div className="mb-12 mt-16">
      <button
        onClick={() => setSearch(!search)}
        title="Toggle Search"
        className="mb-5 bg-lime-600 px-3 pb-2 rounded-lg"
      >
        {SearchFile()}
      </button>
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
          isSearchable={search}
          searchPlaceholder="Type to search file..."
        >
          {(file, index) => (
            <FileCard
              key={index}
              file={file}
              index={index}
              fileInfo={fileInfo}
            />
          )}
        </Collection>
      </ThemeProvider>
    </div>
  );
}

export default FileCollection;
