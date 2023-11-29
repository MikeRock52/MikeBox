import React, { useContext, useState } from "react";
import { Card, Menu, MenuItem } from "@aws-amplify/ui-react";
import getThumbnail, {calculateFileSize, getFileExtension, getFileName} from "../../utilities";
import { FiMoreHorizontal } from "react-icons/fi";
import { deleteFile, shareFile, renameFile } from "../storage";
import { FileContexts } from "../../contexts/FileContexts";
import { EditIcon } from "lucide-react";

function FileCard({ index, file }) {
  const {
    fileInfos,
    setFileInfos,
    files,
    setFiles,
    setShareLink,
    render,
    setRender,
  } = useContext(FileContexts);
  const [newName, setNewName] = useState(getFileName(fileInfos[index].key));
  const [rename, setRename] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRename(e) {
    e.preventDefault();
    setLoading(true);
    if (getFileName(fileInfos[index].key) === newName) {
      console.log("Same name");
      setRename(false);
      setLoading(false);
      return;
    }
    try {
      await renameFile(fileInfos[index].key, newName);
      setRename(false);
      setRender(!render);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

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
            src={getThumbnail(fileInfos[index]) || file}
            alt={fileInfos[index].key}
            className="h-full w-full object-contain"
          />
          <div className="absolute top-0 left-0 opacity-75 h-full max-h-[200px] w-full bg-lime-200 invisible group-hover:visible" />
          <div className={`absolute bottom-0 left-0 ml-3 ${rename ? 'mb-12' : 'mb-4'} w-fit max-h-[200px] text-left text-black invisible group-hover:visible`}>
            <h4 className="font-bold mr-2">
              {getFileName(fileInfos[index].key)}
            </h4>
            <p className="mt-1">
              {getFileExtension(fileInfos[index].key).toUpperCase()}~ $
              {calculateFileSize(fileInfos[index].size)}
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
            <MenuItem onClick={() => setRename(true)}>Rename</MenuItem>
            <MenuItem onClick={async () => {setShareLink(await shareFile(fileInfos[index].key));}}>
              Share
            </MenuItem>
            <MenuItem
              onClick={async () => {
                const key = fileInfos[index].key;
                deleteFile(key);
                setFiles(files.filter((f) => f !== file));
                setFileInfos(fileInfos.filter((f) => f.key !== key));
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      </Card>
      {rename && (
        <form onSubmit={handleRename} className="mt-2 py-auto">
          <input
            className="w-4/5 border-2 mr-2"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button
            title="Rename folder"
            className="text-white px-1"
            type="submit"
            disabled={loading}
          >
            <EditIcon size="20" className="text-[#4a3a99]" />
          </button>
        </form>
      )}
    </div>
  );
}

export default FileCard;
