import { React, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Video } from "./Video";
import { InputForm } from "./InputForm";
import { VideoFileUploadForm } from "./VideoFileUploadForm";
import { Result } from "./Result";
import "./GenerateTitlesAndHashtags.css";
import { useGetVideo } from "./apiHooks";
import keys from "./keys";
import LoadingSpinner from "./LoadingSpinner";
import { ErrorBoundary } from "./ErrorBoundary";
import WarningIcon from "./Warning.svg";
import greenWarningIcon from "./Warning_Green.svg";

/** Generate Titles and Hashtags
 *
 * App -> GenerateTitlesAndHashtags -> {VideoFileUploadForm, Video, InputForm, Result}
 *
 */

export function GenerateTitlesAndHashtags({ index, videoId, refetchVideos }) {
  const { data: video, isLoading } = useGetVideo(
    index,
    videoId,
    Boolean(videoId)
  );

  const [field1, field2, field3] = ["topic", "title", "hashtag"];
  const [types, setTypes] = useState(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showVideoTitle, setShowVideoTitle] = useState(false);
  const [showCheckWarning, setShowCheckWarning] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileUploading, setIsFileUploading] = useState(false);

  const queryClient = useQueryClient();

  const vidTitleRaw = video?.metadata?.video_title;
  const vidTitleClean = decodeAndCleanFilename(vidTitleRaw);

  /** Return clean video file name  */
  function decodeAndCleanFilename(filename) {
    let decodedFilename = filename;
    try {
      decodedFilename = decodeURIComponent(filename);
    } catch (error) {
      console.error("Error decoding filename:", error);
    }
    const cleanedFilename = decodedFilename
      .replace(/%20/g, " ")
      .replace(/\([^)]*\)/g, "");
    return cleanedFilename;
  }

  async function resetTypes() {
    setTypes(new Set());
  }

  useEffect(() => {
    const fetchData = async () => {
      await queryClient.invalidateQueries({
        queryKey: [keys.VIDEOS, index, videoId],
      });
    };
    fetchData();
    resetTypes();
    setIsSubmitted(false);
    setShowVideoTitle(false);
    setShowCheckWarning(false);
    setSelectedFile(null);
    setIsFileUploading(false);
  }, [index, videoId, queryClient]);

  return (
    <div className="GenerateTitlesAndHashtags">
      <h1 className="GenerateTitlesAndHashtags__appTitle">
        Generate Titles and Hashtags for Your Video
      </h1>
      <VideoFileUploadForm
        index={index}
        refetchVideos={refetchVideos}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        isFileUploading={isFileUploading}
        setIsFileUploading={setIsFileUploading}
      />
      {!video && (
        <div className="GenerateTitlesAndHashtags__uploadMessageWrapper">
          <img
            className="GenerateTitlesAndHashtags__uploadMessageWrapper__warningIcon"
            src={greenWarningIcon}
            alt="greenWarningIcon"
          ></img>
          <div>
            <p className="GenerateTitlesAndHashtags__uploadMessageWrapper__message">
              Please upload a video
            </p>
          </div>
        </div>
      )}
      {!isFileUploading && (
        <>
          <ErrorBoundary>
            {isLoading && <LoadingSpinner />}
            {video && (
              <Video
                url={video.hls?.video_url}
                width={"381px"}
                height={"214px"}
              />
            )}
          </ErrorBoundary>
          {showVideoTitle && (
            <div className="GenerateTitlesAndHashtags__videoTitle">
              {vidTitleClean}
            </div>
          )}
          {showCheckWarning && (
            <div className="GenerateTitlesAndHashtags__warningMessageWrapper">
              <img
                className="GenerateTitlesAndHashtags__warningMessageWrapper__warningIcon"
                src={WarningIcon}
                alt="WarningIcon"
              ></img>
              <div className="GenerateTitlesAndHashtags__warningMessageWrapper__warningMessage">
                Please select one of the checkboxes
              </div>
            </div>
          )}
          {video && (
            <InputForm
              video={video}
              field1={field1}
              field2={field2}
              field3={field3}
              setIsSubmitted={setIsSubmitted}
              setShowVideoTitle={setShowVideoTitle}
              setShowCheckWarning={setShowCheckWarning}
              types={types}
            />
          )}
          {video && (
            <Result video={video} isSubmitted={isSubmitted} types={types} />
          )}
        </>
      )}
    </div>
  );
}
