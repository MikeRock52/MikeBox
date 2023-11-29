import React, { useContext } from "react";
import { Card, Menu, MenuItem } from "@aws-amplify/ui-react";
import getThumbnail, {
  calculateFileSize,
  getFileExtension,
  getFileName,
  isFolder,
} from "../../utilities";
import { FiMoreHorizontal } from "react-icons/fi";
import { deleteFile, fetchAllFiles, shareFile } from "../storage";
import { FileContexts } from "../../contexts/FileContexts";
import { Storage } from "aws-amplify";

function FolderCard({ index, file }) {
  const {
    fileInfos,
    setFileInfos,
    files,
    setFiles,
    folders,
    setFolders,
    shareLink,
    setShareLink,
    setTabIndex,
    tabIndex,
    setFolder,
    render,
    setRender,
  } = useContext(FileContexts);

  return (
    <div className="relative">
      <Card
        key={index}
        lineHeight="small"
        backgroundColor="transparent"
        variation="elevated"
        width="280px"
        height="200px"
        className="group hover:opacity-75"
      >
        <div
          className="cursor-pointer inline"
          key={index}
          onClick={() => {
            setTabIndex(index + 1);
            setFolder(folders[index].key);
          }}
        >
          <img
            src={getThumbnail(fileInfos[index]) || file}
            alt={fileInfos[index].key}
            className="h-full w-full object-contain"
          />
          <div className="absolute top-0 left-0 opacity-75 h-full w-full bg-lime-200 invisible group-hover:visible" />
          <div className="absolute bottom-0 left-0 ml-3 mb-4 w-fit text-left text-black invisible group-hover:visible">
            <h4 className="font-bold mr-2">{getFileName(fileInfos[index].key)}</h4>
            <p className="mt-1">FOLDER</p>
          </div>
        </div> 
        <div className="absolute top-0 left-0 ml-3 mt-4 text-black">
          <Menu
            trigger={
              <button className="">
                <FiMoreHorizontal fontSize="24" />
              </button>
            }
            backgroundColor="#fff"
          >
            <MenuItem>Rename</MenuItem>
            <MenuItem
              onClick={async () => {
                const key = fileInfos[index].key;
                deleteFile(key);
                setFolders(folders.filter((f) => f.key !== key));
                setFiles(files.filter((f) => f !== file));
                setFileInfos(fileInfos.filter((f) => f.key !== key));

                const { results } = await Storage.list(key, {
                    level: "private",
                  });
                  for (const file of results) {
                    await Storage.remove(file.key, { level: "private" });
                    // const fileIndex = fileInfos.findIndex((f) => f.key === file.key);
                    // setFileInfos(fileInfos.filter((f, idx) => idx !== fileIndex));
                    // setFiles(files.filter((f, idx) => idx !== fileIndex));
                  }
                  // const fileIndex = fileInfos.findIndex((f) => f.key === key);
                  // setFolders(folders.filter((f) => f.key !== fileInfos[fileIndex].key));
                  setRender(!render);
                }
              }
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      </Card>
    </div>
  );
}

export default FolderCard;
