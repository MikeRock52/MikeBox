import React, { useState } from "react";
import FileActions from "../ui/FileActions";
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

function Dashboard() {
  const [upload, setUpload] = useState(false);
  return (
    <div className="mx-5 md:mx-12">
      <div className="">
        <FileActions setUpload={setUpload} upload={upload} />
      </div>
      {upload && (
        <div className="mt-8 sm:w-4/5 md:w-3/5 mx-auto">
          <StorageManager accessLevel="private" autoUpload={false} maxFileCount={5} isResumable onUploadSuccess={() => {alert("Uploaded!")}} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
