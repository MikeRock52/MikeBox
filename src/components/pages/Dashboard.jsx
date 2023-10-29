import React, { useState } from "react";
import FileActions from "../ui/FileActions";
import "@aws-amplify/ui-react/styles.css";
import FileUploader from "../ui/FileUploader";

function Dashboard() {
  const [upload, setUpload] = useState(false);
  return (
    <div className="mx-5 md:mx-12">
      <div className="">
        <FileActions setUpload={setUpload} upload={upload} />
      </div>
      {upload && (
        <FileUploader setUpload={setUpload} />
      )}
    </div>
  );
}

export default Dashboard;
