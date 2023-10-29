import React, { useState } from "react";
import FileActions from "../ui/FileActions";
import { StorageManager } from "@aws-amplify/ui-react-storage";

function Dashboard() {
  const [upload, setUpload] = useState(false);
  return (
    <div className="mx-5 sm:mx-16">
      <div className="">
        <FileActions setUpload={setUpload} upload={upload} />
      </div>
      {upload && <div className="mt-8">
        <StorageManager />
      </div>}
    </div>
  );
}

export default Dashboard;
