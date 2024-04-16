import React from "react";
import FileUploadComponent from "../FileUpload/FileUploadComponent";
import { useLessonManagement } from "../../context/LessonManagementProvider";

const AddSectionContent = ({ onCancelClick, sectionId }) => {
  const { lesson } = useLessonManagement();
  const handleCancelClick = () => {
    onCancelClick();
  };
  return (
    <div>
      <h1>Add Section Content</h1>
      <div className="flex flex-col justify-between p-2">
        <div className="w-full flex justify-between">
          <div>
            <FileUploadComponent lessonId={lesson._id} sectionId={sectionId} />
          </div>
          <button>
            <input type="text" placeholder="upload pdf " />
          </button>
          <button className=" round h-5 border">
            <input type="text" placeholder="add quiz" />
          </button>
        </div>

        <div className="w-full flex justify-end "></div>
      </div>
      <div className="flex flex-row justify-end mb-2">
        <button
          onClick={() => {
            console.log("save");
          }}
          className="btn bg-yellow-300 p-2 mx-2 w-20 rounded-2xl text-black "
        >
          Save
        </button>
        <button
          onClick={handleCancelClick}
          className="btn bg-red-400 p-2  mx-2  w-20  rounded-2xl  text-black "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddSectionContent;
