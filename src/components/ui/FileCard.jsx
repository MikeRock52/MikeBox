import React from "react";
import { Card, Menu, MenuItem } from "@aws-amplify/ui-react";
import getThumbnail, {
  calculateFileSize,
  getFileExtension,
  getFileName,
  isFolder,
} from "../../utilities";
import { FiMoreHorizontal } from "react-icons/fi";

function FileCard({ index, file, fileInfo }) {
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
        <img
          src={getThumbnail(fileInfo[index]) || file}
          alt={fileInfo[index].key}
          className="h-full w-full object-contain"
        />
        <div className="absolute top-0 left-0 opacity-75 h-full w-full bg-lime-200 invisible group-hover:visible" />
        <div className="absolute bottom-0 left-0 ml-3 mb-4 w-fit text-left text-black invisible group-hover:visible">
          <h4 className="font-bold mr-2">{getFileName(fileInfo[index].key)}</h4>
          <p className="mt-1">
            {getFileExtension(
              isFolder(fileInfo[index].key) ? "FOLDER" : fileInfo[index].key
            ).toUpperCase()}
            {!isFolder(fileInfo[index].key) &&
              ` ~ ${calculateFileSize(fileInfo[index].size)}`}
          </p>
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
            <MenuItem>Share</MenuItem>
            <MenuItem>Delete</MenuItem>
          </Menu>
        </div>
      </Card>
    </div>
  );
}

export default FileCard;
