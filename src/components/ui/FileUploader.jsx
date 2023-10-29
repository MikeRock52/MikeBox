import React from 'react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import toast from "react-hot-toast";


function FileUploader({ setUpload }) {
  return (
    <div className="mt-8 sm:w-4/5 md:w-4/6 lg:w-3/6 mx-auto">
    <StorageManager
      accessLevel="private"
      autoUpload={false}
      maxFileCount={5}
      maxFileSize={10485760}
      // path='/'
      isResumable
      onUploadSuccess={() => {
        toast.success("File(s) uploaded successfully!");
        setUpload(false);
      }}
      onUploadError={() => {
        toast.error("File upload failed! Please try again...");
      }}
    />
  </div>
  )
}

export default FileUploader;
