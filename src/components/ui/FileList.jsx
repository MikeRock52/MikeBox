import React, { useEffect, useState, useContext } from "react";
import { Storage } from "aws-amplify";
import { Tabs, TabItem } from "@aws-amplify/ui-react";
import "./files.css";
import FileCollection from "./FileCollection";
import { isFolder } from "../../utilities";
import FolderFiles from "./FolderFiles";
import { FileContexts } from "../../contexts/FileContexts";
import { fetchAllFiles } from "../storage";
import AWS from "aws-sdk";

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
    render,
  } = useContext(FileContexts);


  async function fetchFiles() {
    // const fileData = await fetchAllFiles(folder);
    // setFiles(fileData.files);
    // setFileInfos(fileData.fileInfos);
    // folder === '/' && setFolders(fileData.folders);
    

    const s3 = new AWS.S3();

const bucket = 'mydropbox';
const key = '/3.png';

const params = {
  Bucket: bucket,
  Prefix: key,
};

s3.listObjectVersions(params, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
    // data.Versions.forEach(version => {
    //   const versionId = version.VersionId;
      
    //   // Fetch each version individually
    //   const getObjectParams = {
    //     Bucket: bucket,
    //     Key: key,
    //     VersionId: versionId,
    //   };

    //   s3.getObject(getObjectParams, (err, data) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       // Process the result (data.Body contains the file data)
    //       console.log(data.Body.toString());
    //     }
    //   });
    // });
  }
});
  }


  useEffect(() => {
    fetchFiles();
  }, [upload, createFolder, folder, render]);

  return (
    <div className="mt-16 mx-5">
      {/* <Tabs
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
            <TabItem title={folder.key.slice(0, -1)} key={index}>
              <FileCollection />
            </TabItem>
          );
        })}
      </Tabs> */}
    </div>
  );
}

export default FileList;
