import React, { useEffect, useContext } from "react";
import { Tabs, TabItem } from "@aws-amplify/ui-react";
import "./files.css";
import FileCollection from "./FileCollection";
import { getFolderName } from "../../utilities";
import { FileContexts } from "../../contexts/FileContexts";
import { fetchAllFiles, fetchFolderFiles } from "../storage";

function FileList() {
  const {
    upload,
    folder,
    setFolder,
    createFolder,
    setFileInfos,
    setFiles,
    folders,
    setFolders,
    tabIndex,
    setTabIndex,
    render,
  } = useContext(FileContexts);


  async function fetchFiles() {
    const fileData = folder === '/' ? await fetchAllFiles(folder) : await fetchFolderFiles(folder);
    setFiles(fileData.files);
    setFileInfos(fileData.fileInfos);
    folder === '/' && setFolders(fileData.folders);
  }
    

  useEffect(() => {
    fetchFiles();
  }, [upload, createFolder, folder, render]);

  return (
    <div className="mt-16 mx-5">
      <Tabs
        currentIndex={tabIndex}
        onChange={(i) => {
          setFolder(i === '0' ? "/" : folders[i - 1].key);
          setTabIndex(i);
        }}
        justifyContent="flex-start"
        borderColor="#a3e635"
        className="overflow-x-auto"
      >
        <TabItem title="All Files">
          <FileCollection />
        </TabItem>
        {folders.map((folder, index) => {
          return (
            <TabItem title={getFolderName(folder.key)} key={index}>
              <FileCollection />
            </TabItem>
          );
        })}
      </Tabs>
    </div>
  );
}

export default FileList;
