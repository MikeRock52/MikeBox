import React, { useEffect, useState } from "react";
import FileCollection from "./FileCollection";
import { Storage } from "aws-amplify";

function FolderFiles({ folderInfo, setFolder, folders, upload, setTabIndex }) {
  const [fileInfo, setFileInfo] = useState([]);
  const [folderFiles, setFolderFiles] = useState([]);

  setFolder(folderInfo.key)

  useEffect(() => {
    async function fetchFolderFiles() {
      let { results } = await Storage.list(folderInfo.key, { level: "private" });
      results = results.slice(1);
      setFileInfo(results);
      const folderFiles = await Promise.all(
        results.map(async (file) => {
          return await Storage.get(file.key, { level: "private" });
        })
      );
      setFolderFiles(folderFiles);
    }

    fetchFolderFiles();
  }, [folderInfo.key, upload]);

  return (
    <div>
      {folderFiles.length > 0 ? (
        <FileCollection files={folderFiles} folders={folders} fileInfo={fileInfo} setTabIndex={setTabIndex} />
      ) : (
        <h2>Empty folder</h2>
      )}
    </div>
  );
}

export default FolderFiles;
