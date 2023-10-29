import React from 'react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import toast from "react-hot-toast";


function FileUploader({ setUpload }) {
  return (
    <div className="mt-8 sm:w-4/5 md:w-3/6 mx-auto">
    <StorageManager
      accessLevel="private"
      autoUpload={false}
      maxFileCount={5}
      isResumable
      onUploadSuccess={() => {
        toast.success("File(s) uploaded successfully!");
        setUpload(false);
      }}
      onUploadError={() => {
        toast.error("File upload falied! Please try again...");
      }}
    />
  </div>
  )
}

export default FileUploader;
