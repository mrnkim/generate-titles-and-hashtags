import "./VideoFileUploadForm.css";
import { useState, useRef, Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Task } from "./Task";
import { ErrorBoundary } from "./ErrorBoundary";
import apiConfig from "./apiConfig";
import keys from "./keys";

/** Receive user's video file, submit it to API, and show task status
 *
 * GenerateTitlesAndHashtags -> {VideoFileUploadForm} -> Task
 *
 */

export function VideoFileUploadForm({
  index,
  refetchVideos,
  selectedFile,
  setSelectedFile,
  isFileUploading,
  setIsFileUploading,
}) {
  const [taskId, setTaskId] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const queryClient = useQueryClient();

  const setInputRef = (ref) => {
    inputRef.current = ref;
  };

  /** Submit a Youtube video url for indexing  */
  async function indexVideo() {
    try {
      const form = new FormData();
      form.append("language", "en");
      form.append("index_id", index);
      form.append("video_file", selectedFile);
      const response = await axios.post(
        apiConfig.INDEX_VIDEO_URL.toString(),
        form,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const taskId = response.data._id;
      setTaskId(taskId);
    } catch (error) {
      setError(error.message);
    }
  }

  /** Verify file type */
  function handleFileSelect(event) {
    let userSelectedFile = event.target.files[0];

    if (userSelectedFile) {
      const allowedVideoTypes = [
        "video/mp4",
        "video/mpeg",
        "video/avi",
        "video/3gpp",
        "video/x-msvideo",
        "video/x-matroska",
        "video/ogg",
        "video/webm",
      ];

      if (allowedVideoTypes.includes(userSelectedFile.type)) {
        setSelectedFile(userSelectedFile);
        setInputRef(selectedFile?.name);
      } else {
        alert("Please select a valid video file (e.g., MP4, MPEG, QuickTime).");
        setInputRef("");
      }
    }
  }

  /** Get information of a video and set it as task */
  async function handleSubmit(evt) {
    evt.preventDefault();
    if (selectedFile) {
      setIsFileUploading(true);
      queryClient.invalidateQueries({
        queryKey: [keys.TASK, taskId],
      });
      try {
        indexVideo();
      } catch (error) {
        console.error("Video upload error:", error);
      }
    }
  }

  return (
    <div className="videoFileUploadForm">
      {!isFileUploading && (
        <div className="videoFileUploadForm__title">Upload video</div>
      )}
      {isFileUploading && (
        <div className="videoFileUploadForm__title">
          Uploading "{selectedFile.name}"
        </div>
      )}
      {!isFileUploading && (
        <form
          className="videoFileUploadForm__form"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <input
            className="videoFileUploadForm__form__input"
            id="fileUpload"
            data-cy="data-cy-url-input"
            ref={setInputRef}
            onChange={handleFileSelect}
            type="file"
            accept="video/*"
            name="video_file"
          ></input>
          <button
            className="videoFileUploadForm__form__button"
            data-cy="data-cy-upload-button"
            disabled={isFileUploading || inputRef.current?.value?.length < 1}
          >
            Upload
          </button>
        </form>
      )}
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          {isFileUploading && (
            <div className="videoFileUploadForm__taskWrapper">
              <div className="videoFileUploadForm__taskWrapper__message">
                {!taskId && "Submitting..."}
              </div>
              {taskId && (
                <Task
                  taskId={taskId}
                  refetchVideos={refetchVideos}
                />
              )}
            </div>
          )}
        </Suspense>
      </ErrorBoundary>
      {error && <div className="videoFileUploadForm_errorMessage">{error}</div>}
    </div>
  );
}
