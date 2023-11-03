import { Storage } from "aws-amplify";
import toast from "react-hot-toast";

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
    toast.error('Error renaming the file:', error);
  }
}


export {deleteFile, renameFile}
