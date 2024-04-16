import "./FileUploadComponent.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import config from "../../config/env.config";

const FileUploadComponent = ({ lessonId, sectionId }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("video");
  const [order, setOrder] = useState(1); // Start with default order

  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadPercentage(0);
    setUploadComplete(false);
    setIsProcessing(false);
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onTypeChange = (event) => {
    setType(event.target.value);
  };
  const onOrderChange = (event) => {
    setOrder(event.target.value);
  };
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("order", order);

    const requestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadPercentage(percentCompleted);
        if (percentCompleted === 100) {
          setIsProcessing(true); // Indicate processing state
        }
      },
    };

    axios
      .post(
        `${config.apiBaseUrl}/api/mediaUpload/${lessonId}/${sectionId}`,
        formData,
        requestConfig
      )
      .then((response) => {
        setUploadComplete(true);
        setIsProcessing(false);
        console.log("File uploaded successfully", response.data);
      })
      .catch((error) => {
        console.error("Error uploading file", error);
        setUploadPercentage(0);
        setIsProcessing(false);
      });
  };

  return (
    <div className="file-upload-component">
      <div className="flex flex-col justify-start">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={onDescriptionChange}
          rows={4}
        ></textarea>
      </div>
      <div>
        {/* Type dropdown component */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Content Type
          </label>
          <select
            id="type"
            value={type}
            onChange={onTypeChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        {/* Order input component */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="order"
          >
            Order
          </label>
          <input
            type="number"
            id="order"
            value={order}
            onChange={onOrderChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <input type="file" name="file" onChange={onFileChange} />
      <button onClick={onFileUpload} disabled={!file || uploadComplete}>
        Upload
      </button>
      {uploadPercentage > 0 && !uploadComplete && (
        <div>
          {isProcessing ? (
            <FontAwesomeIcon icon={faSpinner} spin color="blue" />
          ) : (
            `${uploadPercentage}%`
          )}
        </div>
      )}
      {uploadComplete && <FontAwesomeIcon icon={faCheck} color="green" />}
    </div>
  );
};

export default FileUploadComponent;
