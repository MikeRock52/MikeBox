import { Storage } from "aws-amplify";
import toast from "react-hot-toast";
import { isFolder, getFolderName } from "../utilities";

async function fetchFolderFiles(folderKey) {
  try {
    let { results } = await Storage.list(folderKey, { level: "private" });
    console.log(results)

    const folderName = getFolderName(folderKey);
    results = results.filter((file) => {
      let fileParts = file.key.split("/");
      fileParts = fileParts.slice(fileParts.indexOf(folderName));
      return fileParts[0] === folderName && !fileParts[2];
    });

    const folders = results.filter((file) => {
      return isFolder(file.key) === true;
    });

    const justFiles = results.filter((file) => {
      return !isFolder(file.key);
    });

    const files = await Promise.all(
      [...folders, ...justFiles].map(async (file) => {
        return await Storage.get(file.key, { level: "private" });
      })
    );
    return {files, folders, fileInfos: [...folders, ...justFiles]};
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function fetchAllFiles(folderKey) {
  try {
    const { results } = await Storage.list(folderKey, { level: "private" });
    console.log(results)

    const folders = results.filter((file) => {
      return isFolder(file.key) === true;
    });

    const justFiles = results.filter((file) => {
      return !isFolder(file.key);
    });

    const files = await Promise.all(
      [...folders, ...justFiles].map(async (file) => {
        return await Storage.get(file.key, { level: "private" });
      })
    );
    return {files, folders, fileInfos: [...folders, ...justFiles]};
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteFile(fileKey) {
  try {
    await Storage.remove(fileKey, { level: "private" });
    toast.success(`${fileKey} deleted successfully`);
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
}

async function renameFile(oldKey, newKey) {
  try {
    await Storage.copy(oldKey, newKey, { level: 'private' });
    await Storage.remove(oldKey, { level: 'private' });

    toast.success('File renamed successfully.');
  } catch (error) {
    toast.error('Error renaming the file');
    console.error(error);
  }
}

async function shareFile(fileKey) {
  try {
    const signedUrl = await Storage.get(fileKey, { level: "private", expires: 3600 });
    return signedUrl; 
  } catch(error) {
    toast.error("Error sharing file");
    console.error(error);
    return "";
  }
}

export {deleteFile, renameFile, shareFile, fetchFolderFiles, fetchAllFiles}
