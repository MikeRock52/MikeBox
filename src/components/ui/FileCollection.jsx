import React, { useState } from "react";
import { Collection, Alert, ThemeProvider } from "@aws-amplify/ui-react";
import theme from "./theme";
import "./files.css";
import FileCard from "./FileCard";
import { SearchFile } from "../Icons";
import { isFolder } from "../../utilities";
import FileShare from "./FileShare";

function FileCollection({ files, setFiles, fileInfo, folders, setTabIndex }) {
  const [search, setSearch] = useState(false);
  const [shareLink, setShareLink] = useState("");

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
            onDismiss={() => {setShareLink("")}}
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
            return !isFolder(fileInfo[index].key) ? (
              
                <FileCard
                  key={index}
                  file={file}
                  index={index}
                  fileInfo={fileInfo}
                  shareLink={shareLink}
                  setShareLink={setShareLink}
                  setFiles={setFiles}
                />
            ) : (
              <div
                className="cursor-pointer"
                key={index}
                onClick={() => {
                  setTabIndex(
                    folders.findIndex((f) => f.key === fileInfo[index].key) + 1
                  );
                }}
              >
                <FileCard
                  file={file}
                  index={index}
                  fileInfo={fileInfo}
                  shareLink={shareLink}
                  setShareLink={setShareLink}
                />
              </div>
            );
          }}
        </Collection>
      </ThemeProvider>
    </div>
  );
}

export default FileCollection;
