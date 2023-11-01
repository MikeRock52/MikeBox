import React, { useState } from "react";
import FileActions from "../ui/FileActions";
import "@aws-amplify/ui-react/styles.css";
import FileUploader from "../ui/FileUploader";
import FileList from "../ui/FileList";
import FolderCreator from "../ui/FolderCreator";

function Dashboard() {
  const [upload, setUpload] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);
  const [folder, setFolder] = useState("");
  const [showFiles, setShowFiles] = useState(true);

  return (
    <div className="">
      <div className="mx-5 md:mx-12">
        <FileActions
          setUpload={setUpload}
          upload={upload}
          createFolder={createFolder}
          setCreateFolder={setCreateFolder}
          showFiles={showFiles}
          setShowFiles={setShowFiles}
        />
      </div>
      {createFolder && <FolderCreator setCreateFolder={setCreateFolder} />}
      {upload && <FileUploader setUpload={setUpload} folder={folder} />}
      {showFiles && <div className="mt-8">
        <FileList upload={upload} folder={folder} setFolder={setFolder} createFolder={createFolder} />
      </div>}
    </div>
  );
}

export default Dashboard;
