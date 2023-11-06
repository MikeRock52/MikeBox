import React, { useEffect, useState, useContext } from "react";
import { Storage } from "aws-amplify";
import { Tabs, TabItem } from "@aws-amplify/ui-react";
import "./files.css";
import FileCollection from "./FileCollection";
import { isFolder } from "../../utilities";
import FolderFiles from "./FolderFiles";
import { FileContexts } from "../../contexts/FileContexts";

function FileList() {
  const {
    upload,
    setFolder,
    createFolder,
    fileInfo,
    setFileInfo,
    files,
    setFiles,
    folders,
    setFolders,
    tabIndex,
    setTabIndex,
  } = useContext(FileContexts);

  useEffect(() => {
    async function fetchAllFiles() {
      try {
        const { results } = await Storage.list("", { level: "private" });

        console.log(results);

        setFolders(
          results.filter((file) => {
            return isFolder(file.key) === true;
          })
        );

        const justFiles = results.filter((file) => {
          return !isFolder(file.key);
        });

        setFileInfo(justFiles);

        const files = await Promise.all(
          justFiles.map(async (file) => {
            return await Storage.get(file.key, { level: "private" });
          })
        );
        setFiles(files);
        console.log(files);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllFiles();
  }, [upload, createFolder]);

  return (
    <div className="mt-16 mx-5">
      <Tabs
        currentIndex={tabIndex}
        onChange={(i) => setTabIndex(i)}
        justifyContent="flex-start"
        borderColor="#a3e635"
      >
        <TabItem title="All Files" onClick={() => setFolder("")}>
          <FileCollection />
        </TabItem>
        {folders.map((folder, index) => {
          return (
            <TabItem title={folder.key} key={index}>
              <FolderFiles
                key={index}
                folderInfo={folder}
                setFolder={setFolder}
                upload={upload}
                folders={folders}
                setFolders={setFolders}
                setTabIndex={setTabIndex}
              />
            </TabItem>
          );
        })}
      </Tabs>
    </div>
  );
}

export default FileList;
