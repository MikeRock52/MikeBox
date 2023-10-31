import { Storage } from "aws-amplify";

async function fetchAllFiles() {
    const { results } = await Storage.list("", { level: "private" });
    setFileInfo(results);
    const allFiles = await Promise.all(
      results.map(async (file) => {
        // console.log(file.contentType)
        return await Storage.get(file.key, { level: "private" });
      })
    );
    setFiles(allFiles);
  }
