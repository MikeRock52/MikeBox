import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import { Tabs, TabItem } from "@aws-amplify/ui-react";
import "./files.css";
import FileCollection from "./FileCollection";
import { isFolder } from "../../utilities";
import FolderFiles from "./FolderFiles";

function FileList({ upload, setFolder, createFolder, tabIndex, setTabIndex }) {
  const [fileInfo, setFileInfo] = useState([]);
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  async function fetchAllFiles() {
    const { results } = await Storage.list("", { level: "private" });
    
    setFolders(
      results.filter((file) => {
        return isFolder(file.key) === true;
      })
    );

    const justFiles = results.filter((file) => {
      return !isFolder(file.key);
    })

    setFileInfo(justFiles);
    
    const files = await Promise.all(
      justFiles.map(async (file) => {
        return await Storage.get(file.key, { level: "private" });
      })
    );
    setFiles(files);
  }

  useEffect(() => {
    fetchAllFiles();
  }, [upload, createFolder]);

  return (
    <div className="mt-16 mx-5">
      <Tabs currentIndex={tabIndex} onChange={(i) => setTabIndex(i)} justifyContent="flex-start" borderColor="#a3e635">
        <TabItem title="All Files" onClick={() => setFolder("")}>
          <FileCollection files={files} fileInfo={fileInfo} />
        </TabItem>
        {folders.map((folder, index) => {
          // .current[index] = React.createRef();
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
