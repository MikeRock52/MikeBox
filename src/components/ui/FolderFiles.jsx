import React, { useEffect, useState, useContext } from "react";
import FileCollection from "./FileCollection";
import { Storage } from "aws-amplify";
import { FileContexts } from "../../contexts/FileContexts";

function FolderFiles({ folderInfo }) {
  const {
    setFolder,
    folders,
    setFolders,
    upload,
    setTabIndex,
    fileInfos,
    setFileInfos,
    folderFiles,
    setFolderFiles,
    files,
    setFiles,
    folder,
  } = useContext(FileContexts);

  setFolder(folderInfo.key);

  console.log(folder);
  console.log(files);

  useEffect(() => {
    async function fetchFolderFiles() {
      let { results } = await Storage.list(folderInfo.key, {
        level: "private",
      });
      results = results.slice(1);
      setFileInfos(results);
      const folderFiles = await Promise.all(
        results.map(async (file) => {
          return await Storage.get(file.key, { level: "private" });
        })
      );
      // setFolderFiles(folderFiles);
      setFiles(folderFiles);
    }

    fetchFolderFiles();
  }, [folderInfo.key, upload]);

  return (
    <div>
      {folderFiles.length > 0 ? (
        <FileCollection
          // files={folderFiles}
          // folders={folders}
          // setFolders={setFolders}
          // fileInfos={fileInfos}
          // setFileInfos={setFileInfos}
          // setTabIndex={setTabIndex}
        />
      ) : (
        <h2 className="mt-3">Empty folder</h2>
      )}
    </div>
  );
}

export default FolderFiles;
