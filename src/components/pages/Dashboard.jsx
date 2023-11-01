import React, { useState } from "react";
import FileActions from "../ui/FileActions";
import "@aws-amplify/ui-react/styles.css";
import FileUploader from "../ui/FileUploader";
import FileList from "../ui/FileList";
import FolderCreator from "../ui/FolderCreator";

function Dashboard() {
  const [upload, setUpload] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);
  const [folder, setFolder] = useState("mikebox/");

  return (
    <div className="">
      <div className="mx-5 md:mx-12">
        <FileActions
          setUpload={setUpload}
          upload={upload}
          createFolder={createFolder}
          setCreateFolder={setCreateFolder}
        />
      </div>
      {createFolder && <FolderCreator setCreateFolder={setCreateFolder} />}
      {upload && <FileUploader setUpload={setUpload} />}
      <div className="mt-8">
        <FileList upload={upload} folder={folder} />
      </div>
    </div>
  );
}

export default Dashboard;
