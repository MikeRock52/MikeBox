import { Storage } from "aws-amplify";
import toast from "react-hot-toast";
import { isFolder, getFolderName, getFileName } from "../utilities";

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

async function renameFolder(oldKey, newName) {
  try {
    const oldFolderName = getFolderName(oldKey);

    let { results } = await Storage.list(oldKey, { level: "public" });
    results = results.slice(1);
    console.log(results.length);
    let newFolderKey;

    results.length > 0 &&
      results.map(async (file) => {
        console.log(file);
        const keySplit = oldKey.split("/");
        // console.log(keySplit)
        const folderNameIndex = keySplit.indexOf(oldFolderName);
        keySplit[folderNameIndex] = newName;
        // console.log(keySplit)
        newFolderKey = keySplit.join("/");
        // console.log(newFolderKey)
        const newFileKey = `${newFolderKey}${
          isFolder(file.key) ? getFolderName(file.key) + "/" : getFileName(file.key)
        }`;
        console.log(newFileKey);
        await Storage.copy(
          { key: file.key, level: "private" },
          { key: newFileKey, level: "private" }
        );
        // console.log("Copied");
        await Storage.remove(file.key, { level: "private" });
      });

    await Storage.copy(
      { key: oldKey, level: "private" },
      { key: newFolderKey, level: "private" }
    );
    await Storage.remove(oldKey, { level: "private" });

    console.log("Folder renamed successfully.");
  } catch (error) {
    console.error("Error renaming the folder", error.message);
    throw error;
  }
}

export {deleteFile, renameFile, renameFolder, shareFile, fetchFolderFiles, fetchAllFiles}
