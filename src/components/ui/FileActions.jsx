import React from "react";
import { UploadIcon, CreateFolder, ToFolder, ViewFiles } from "../Icons";

function FileActions({ upload, setUpload, createFolder, setCreateFolder }) {
  return (
    <div className="flex justify-center flex-wrap mt-8">
      <button
        onClick={() => {
          setCreateFolder(false);
          setUpload(!upload)
        }}
        className="fileAction"
      >
        {UploadIcon()}
        <h4 className="w-fit h-fit mx-auto font-bold">Upload</h4>
      </button>
      <button
        onClick={() => {
          setUpload(false);
          setCreateFolder(!createFolder);
        }}
        className="fileAction"
      >
        {CreateFolder()}
        <h4 className="w-fit h-fit mx-auto font-bold">Create Folder</h4>
      </button>
      <button
        className="fileAction"
      >
        {ToFolder()}
        <h4 className="w-fit h-fit mx-auto font-bold">Upload to Folder</h4>
      </button>
      <button
        className="fileAction"
      >
        {ViewFiles()}
        <h4 className="w-fit h-fit mx-auto font-bold">View Files</h4>
      </button>
    </div>
  );
}

export default FileActions;
