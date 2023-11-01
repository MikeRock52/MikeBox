import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import { Tabs, TabItem } from "@aws-amplify/ui-react";
import "./files.css";
import FileCollection from "./FileCollection";
import { isFolder } from "../../utilities";
import FolderFiles from "./FolderFiles";

function FileList({ upload, folder, setFolder }) {
  const [fileInfo, setFileInfo] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  async function fetchAllFiles() {
    const { results } = await Storage.list("", { level: "private" });
    setFileInfo(results);
    setFolders(
      results.filter((file) => {
        return isFolder(file.key) === true;
      })
    );
    const allFiles = await Promise.all(
      results.map(async (file) => {
        return await Storage.get(file.key, { level: "private" });
      })
    );
    setAllFiles(allFiles);
  }

  useEffect(() => {
    fetchAllFiles();
  }, [upload]);

  return (
    <div>
      <Tabs justifyContent="flex-start">
        <TabItem title="All Files" onClick={() => setFolder("")}>
          <FileCollection files={allFiles} fileInfo={fileInfo} />
        </TabItem>
        {folders.map((folder, index) => {
          return (
            <TabItem title={folder.key} key={index}>
              <FolderFiles folderInfo={folder} setFolder={setFolder} upload={upload} />
            </TabItem>
          );
        })}
      </Tabs>
    </div>
  );
}

export default FileList;
