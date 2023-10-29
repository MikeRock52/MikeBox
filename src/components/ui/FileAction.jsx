import React from "react";
import { UploadIcon, CreateFolder, EditPDF } from "../Icons";

function FileActions() {
  async function uploadFile() {
    return null;
  }

  return (
    <div className="grid grid-cols-3 mx-16">
      <button
        onClick={uploadFile}
        className="grid align-middle rounded-md border-2 border-lime-700 mx-12 w-32 h-20 hover:bg-lime-300"
      >
        {UploadIcon()}
        <h4 className="w-fit h-fit mx-auto font-bold">Upload</h4>
      </button>
      <button
        onClick={uploadFile}
        className="grid align-middle rounded-md border-2 border-lime-700 mx-12 w-32 h-20 hover:bg-lime-300"
      >
        {CreateFolder()}
        <h4 className="w-fit h-fit mx-auto font-bold">Create Folder</h4>
      </button>
      <button
        onClick={uploadFile}
        className="grid align-middle rounded-md border-2 border-lime-700 mx-12 w-32 h-20 hover:bg-lime-300"
      >
        {EditPDF()}
        <h4 className="w-fit h-fit mx-auto font-bold">Edit PDF</h4>
      </button>
    </div>
  );
}

export default FileActions;
