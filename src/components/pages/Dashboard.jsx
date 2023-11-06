import React, { useState, useContext } from "react";
import FileActions from "../ui/FileActions";
import "@aws-amplify/ui-react/styles.css";
import FileUploader from "../ui/FileUploader";
import FileList from "../ui/FileList";
import FolderCreator from "../ui/FolderCreator";
import { FileContexts } from "../../contexts/FileContexts";
import TestComponent from "../TestComponent";

function Dashboard() {
  const [upload, setUpload] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);
  const [folder, setFolder] = useState("");
  const [showFiles, setShowFiles] = useState(true);

  return (
    <div className="">
      <FileContexts.Provider
        value={{
          setUpload,
          upload,
          createFolder,
          setCreateFolder,
          showFiles,
          setShowFiles,
          folder,
          setFolder,
        }}
      >
        <div className="mx-5 md:mx-12">
          <FileActions/>
        </div>
        {createFolder && (
          <FolderCreator
            // setCreateFolder={setCreateFolder}
            // currentFolder={folder}
          />
        )}
        {upload && <FileUploader
        // setUpload={setUpload}
        // folder={folder}
         />}
        {showFiles && (
          <div className="mt-8">
            <FileList
              // upload={upload}
              // folder={folder}
              // setFolder={setFolder}
              // createFolder={createFolder}
            />
          </div>
        )}
      </FileContexts.Provider>
    </div>
  );
}

export default Dashboard;
