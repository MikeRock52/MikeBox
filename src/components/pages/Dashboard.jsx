import React, { useState } from "react";
import FileActions from "../ui/FileActions";
import "@aws-amplify/ui-react/styles.css";
import FileUploader from "../ui/FileUploader";
import FileList from "../ui/FileList";

function Dashboard() {
  const [upload, setUpload] = useState(false);
  return (
    <div className="">
      <div className="mx-5 md:mx-12">
        <FileActions setUpload={setUpload} upload={upload} />
      </div>
      {upload && (
        <FileUploader setUpload={setUpload} />
      )}
      <div className="mt-8">
        <FileList upload={upload} />
      </div>
    </div>
  );
}

export default Dashboard;
