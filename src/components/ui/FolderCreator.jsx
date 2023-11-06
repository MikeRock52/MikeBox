import React, { useState, useContext } from "react";
import { Input, Flex } from "@aws-amplify/ui-react";
import { CreateFolder } from "../Icons";
import { Storage } from "aws-amplify";
import toast from "react-hot-toast";
import { FileContexts } from "../component"

function FolderCreator() {
  const [folder, setFolder] = useState("");
  const { setCreateFolder, folder: currentFolder } = useContext(FileContexts);

  async function createFolder() {
    try {
      await Storage.put(`${currentFolder}${folder}/`, "", { level: "private" });
      toast.success(`Successfully created folder: ${folder}/`);
      setCreateFolder(false);
      setFolder("");
    } catch (error) {
      toast.error("Error creating folder:", error);
      setCreateFolder(false);
    }
  }

  return (
    <div className="w-4/6 sm:w-3/6 lg:w-2/6 my-16 mx-auto">
      <Flex>
        <Input
          id="events"
          title="Folder Name"
          placeholder="Folder Name"
          variation="quiet"
          boxShadow="medium"
          borderWidth="medium"
          borderColor="#65a30d"
          value={folder}
          onChange={(e) => setFolder(e.currentTarget.value)}
        />
        <button
          onClick={createFolder}
          title="Create Folder"
          className="text-lime-600 px-3 rounded-full  hover:bg-lime-200">
          {CreateFolder()}
        </button>
      </Flex>
    </div>
  );
}

export default FolderCreator;
