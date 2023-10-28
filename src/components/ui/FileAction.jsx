import React from "react";
import { UploadIcon } from "../Icons";

function FileActions() {
  async function uploadFile() {
    return null;
  }

  return (
    <div className="">
      <button
        onClick={uploadFile}
        className="grid grid-col-1 align-middle rounded-md border-2 border-lime-700 mx-12 w-32 h-20 hover:bg-lime-300"
      >
        {UploadIcon()}
        <h4 className="w-fit h-fit my-auto ml-4 font-bold">Upload</h4>
      </button>
      <button className="grid grid-col-1 align-middle rounded-md border-2 border-lime-700 mx-12 w-32 h-20 hover:bg-lime-300">
        <h4 className="w-fit h-fit my-auto ml-4 font-bold">Create Folder</h4>
      </button>
    </div>
  );
}

export default FileActions;
