import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";

function FileList({ upload }) {
  const [files, setFiles] = useState(null);

  function fetchAllFiles() {
    Storage.list("", { level: "private" }, { pageSize: 2 })
      .then(({ results }) => setFiles(results))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchAllFiles();
  }, [upload]);

  files && console.log(files);

  return <div>FileList</div>;
}

export default FileList;
