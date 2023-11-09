import React, { useState, useContext } from "react";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import toast from "react-hot-toast";
import { FileContexts } from "../../contexts/FileContexts";
import { getFileName } from "../../utilities";

function FileUploader() {
  const { setUpload, folder } = useContext(FileContexts);

  return (
    <div className="mt-8 sm:w-4/5 md:w-4/6 lg:w-3/6 mx-auto">
      <StorageManager
        accessLevel="private"
        autoUpload={false}
        maxFileCount={5}
        maxFileSize={10485760}
        isResumable
        processFile={({ file, key }) => {
          key = `${folder}${Date.now()}_${key}`;
          return {
            file,
            key,
          };
        }}
        onUploadSuccess={({ key }) => {
          toast.success(`${getFileName(key)} uploaded successfully!`);
          setUpload(false);
        }}
        onUploadError={() => {
          toast.error("File upload failed! Please try again...");
        }}
      />
    </div>
  );
}

export default FileUploader;
