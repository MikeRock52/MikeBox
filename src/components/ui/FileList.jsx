import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import { Tabs, TabItem } from "@aws-amplify/ui-react";
import "./files.css";
import FileCollection from "./FileCollection";
import { isFolder } from "../../utilities";
import FolderFiles from "./FolderFiles";

function FileList({ upload, setFolder, createFolder, foldersRef }) {
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
  }, [upload, createFolder]);

  return (
    <div className="mt-16 mx-5">
      <Tabs justifyContent="flex-start" borderColor="#a3e635">
        <TabItem title="All Files" onClick={() => setFolder("")}>
          <FileCollection files={allFiles} fileInfo={fileInfo} foldersRef={foldersRef} />
        </TabItem>
        {folders.map((folder, index) => {
          // foldersRef.current[index] = React.createRef();
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
