import React, { useContext } from "react";
import { Card, Menu, MenuItem } from "@aws-amplify/ui-react";
import getThumbnail, {
  calculateFileSize,
  getFileExtension,
  getFileName,
  isFolder,
} from "../../utilities";
import { FiMoreHorizontal } from "react-icons/fi";
import { deleteFile, shareFile } from "../storage";
import { FileContexts } from "../../contexts/FileContexts";

function FileCard({index, file,}) {
  const {
    fileInfo,
    setFileInfo,
    files,
    setFiles,
    folders,
    setFolders,
    shareLink,
    setShareLink,
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
        <a href={file} target="_blank" rel="noreferrer noopener">
          <img
            src={getThumbnail(fileInfo[index]) || file}
            alt={fileInfo[index].key}
            className="h-full w-full object-contain"
          />
          <div className="absolute top-0 left-0 opacity-75 h-full w-full bg-lime-200 invisible group-hover:visible" />
          <div className="absolute bottom-0 left-0 ml-3 mb-4 w-fit text-left text-black invisible group-hover:visible">
            <h4 className="font-bold mr-2">
              {getFileName(fileInfo[index].key)}
            </h4>
            <p className="mt-1">
              {getFileExtension(
                isFolder(fileInfo[index].key) ? "FOLDER" : fileInfo[index].key
              ).toUpperCase()}
              {!isFolder(fileInfo[index].key) &&
                ` ~ ${calculateFileSize(fileInfo[index].size)}`}
            </p>
          </div>
        </a>
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
                setShareLink(await shareFile(fileInfo[index].key));
              }}
            >
              Share
            </MenuItem>
            <MenuItem
              onClick={() => {
                console.log(files);
                // deleteFile(fileInfo[index].key);
                // isFolder(fileInfo[index].key) && setFolders(folders.filter((f) => f.key !== file.key))
                // setFiles(files.filter((f) => f !== file));
                // setFileInfo(fileInfo.filter((f) => f.key !== fileInfo[index].key));
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      </Card>
    </div>
  );
}

export default FileCard;
