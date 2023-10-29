import React from "react";
import { UploadIcon, CreateFolder, EditPDF } from "../Icons";

function FileActions({ upload, setUpload }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={() => {setUpload(!upload)}}
        className="grid align-middle rounded-md border-2 border-lime-700 mx-1 sm:mx-5 w-32 h-20 hover:bg-lime-300"
      >
        {UploadIcon()}
        <h4 className="w-fit h-fit mx-auto font-bold">Upload</h4>
      </button>
      <button
        className="grid align-middle rounded-md border-2 border-lime-700 mx-1 sm:mx-5 w-32 h-20 hover:bg-lime-300"
      >
        {CreateFolder()}
        <h4 className="w-fit h-fit mx-auto font-bold">Create Folder</h4>
      </button>
      <button
        className="grid align-middle rounded-md border-2 border-lime-700 mx-1 sm:mx-5 w-32 h-20 hover:bg-lime-300"
      >
        {EditPDF()}
        <h4 className="w-fit h-fit mx-auto font-bold">Edit PDF</h4>
      </button>
    </div>
  );
}

export default FileActions;
