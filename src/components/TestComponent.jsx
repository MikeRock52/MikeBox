import React, { useContext } from "react";
import { FileContexts } from "../contexts/FileContexts";

function TestComponent() {
  const {
    upload,
    setUpload,
    createFolder,
    setCreateFolder,
    showFiles,
    setShowFiles,
  } = useContext(FileContexts);

  console.log(upload);
  return <div>TestComponent</div>;
}

export default TestComponent;
