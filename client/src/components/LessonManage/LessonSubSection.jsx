import { useLessonManagement } from "../../context/LessonManagementProvider.jsx";

const LessonSubSection = (props) => {
  const { isNewSubSection, saveNewSubSection } = useLessonManagement();
  const newSubSectionNameChangeHandler = (e) => {};
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={""}
            onChange={newSubSectionNameChangeHandler}
            className="ml-2"
          />
        </div>
        <div className="flex flex-row justify-end">
          <button
            onClick={() => {}}
            className="btn bg-red-300 p-2 mr-2 rounded-md text-black"
          >
            Cancel
          </button>
          <button
            onClick={() => {}}
            className="btn bg-purple-300 p-2 rounded-md text-black"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonSubSection;
