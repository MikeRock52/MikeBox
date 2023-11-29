import React, { useState, useContext } from "react";
import { Collection, Alert, ThemeProvider } from "@aws-amplify/ui-react";
import theme from "./theme";
import "./files.css";
import FileCard from "./FileCard";
import FolderCard from "./FolderCard";
import { SearchFile } from "../Icons";
import { isFolder } from "../../utilities";
import FileShare from "./FileShare";
import { FileContexts } from "../../contexts/FileContexts";

function FileCollection() {
  const {
    files,
    setFiles,
    fileInfos,
    setFileInfos,
    folders,
    setFolders,
    folder,
    setFolder,
    setTabIndex,
    shareLink,
    setShareLink,
    search,
    setSearch,
  } = useContext(FileContexts);

  return (
    <div className="mb-12 mt-8">
      <button
        onClick={() => setSearch(!search)}
        title="Toggle Search"
        className="mb-5 bg-lime-600 px-3 pb-2 rounded-lg"
      >
        {SearchFile()}
      </button>
      {shareLink && (
        <div className="flex justify-center mb-2">
          <Alert
            isDismissible
            variation="info"
            backgroundColor="#d9f99d"
            hasIcon={true}
            heading="Shared Link Created"
            onDismiss={() => {
              setShareLink("");
            }}
          >
            <h3 className="my-1">
              You can share your file using the link below
            </h3>
            <h5>Link is only valid for 60 minutes</h5>
            <FileShare text={shareLink} />
          </Alert>
        </div>
      )}
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
          {(file, index) => {
            if (!isFolder(fileInfos[index].key)) {
              return <FileCard key={index} file={file} index={index} />
            } else {
              if (fileInfos[index].key !== folder) {
                return <FolderCard key={index} file={file} index={index} />
              }
            }
          }}
        </Collection>
      </ThemeProvider>
    </div>
  );
}

export default FileCollection;
