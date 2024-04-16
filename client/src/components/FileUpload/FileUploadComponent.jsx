import "./FileUploadComponent.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const FileUploadComponent = ({ lessonId }) => {
  const [file, setFile] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadPercentage(0);
    setUploadComplete(false);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadPercentage(percentCompleted);
      },
    };

    axios
      .post(`/api/mediaUpload/${lessonId}`, formData, config)
      .then((response) => {
        setUploadComplete(true);
        console.log("File uploaded successfully", response.data);
      })
      .catch((error) => {
        console.error("Error uploading file", error);
        setUploadPercentage(0);
      });
  };

  return (
    <div className="file-upload-component">
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload} disabled={!file || uploadComplete}>
        Upload
      </button>
      {uploadPercentage > 0 && !uploadComplete && (
        <div>{uploadPercentage}%</div>
      )}
      {uploadComplete && <FontAwesomeIcon icon={faCheck} color="green" />}
    </div>
  );
};

export default FileUploadComponent;
