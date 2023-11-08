import React, { useEffect, useState, useContext } from "react";
import { Storage } from "aws-amplify";
import { Tabs, TabItem } from "@aws-amplify/ui-react";
import "./files.css";
import FileCollection from "./FileCollection";
import { isFolder } from "../../utilities";
import FolderFiles from "./FolderFiles";
import { FileContexts } from "../../contexts/FileContexts";
import { fetchAllFiles } from "../storage";

function FileList() {
  const {
    upload,
    folder,
    setFolder,
    createFolder,
    fileInfos,
    setFileInfos,
    files,
    setFiles,
    folders,
    setFolders,
    tabIndex,
    setTabIndex,
  } = useContext(FileContexts);


  async function fetchFiles() {
    const fileData = await fetchAllFiles(folder);
    setFiles(fileData.files);
    setFileInfos(fileData.fileInfos);
    folder === '/' && setFolders(fileData.folders);
  }

  useEffect(() => {
    fetchFiles();
  }, [upload, createFolder, folder]);

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
      >
        <TabItem title="All Files">
          <FileCollection />
        </TabItem>
        {folders.map((folder, index) => {
          return (
            <TabItem title={folder.key} key={index}>
              <FileCollection />
            </TabItem>
          );
        })}
      </Tabs>
    </div>
  );
}

export default FileList;
