import React, { useContext } from "react";
import { UploadIcon, CreateFolder, ToFolder, ViewFiles } from "../Icons";
import { FileContexts } from "../../contexts/FileContexts";

function FileActions() {
  const {
    upload,
    setUpload,
    createFolder,
    setCreateFolder,
    showFiles,
    setShowFiles,
  } = useContext(FileContexts);

  return (
    <div className="flex justify-center flex-wrap mt-8">
      <button
        onClick={() => {
          setCreateFolder(false);
          setUpload(!upload);
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
      {/* <button className="fileAction">
        {ToFolder()}
        <h4 className="w-fit h-fit mx-auto font-bold">Upload to Folder</h4>
      </button> */}
      <button onClick={() => setShowFiles(!showFiles)} className="fileAction">
        {ViewFiles()}
        <h4 className="w-fit h-fit mx-auto font-bold">
          {showFiles ? "Hide Files" : "Show Files"}
        </h4>
      </button>
    </div>
  );
}

export default FileActions;
