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

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

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
