import { React, useEffect } from "react";
import { Video } from "./Video";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import "./Result.css";
import { useGenerateTtitleTopicHashtag } from "./apiHooks";
import keys from "./keys";
import { ErrorBoundary } from "./ErrorBoundary";

/** Shows the results
 *
 * SummarizeVideo -> {Result} -> Video
 *
 */

export function Result({
  video,
  isSubmitted,
  // field1Prompt,
  // field2Prompt,
  // field3Prompt,
  types,
}) {
  console.log("🚀 > types=", types);
  console.log("🚀 > video=", video);
  const { data: result } = useGenerateTtitleTopicHashtag(
    types,
    video?._id,
    Boolean(video?._id && types?.size > 0 && isSubmitted)
  );
  // const { data: field2Result } = useGenerateTitle(
  console.log("🚀 > result=", result);
  //   field2Prompt,
  //   video?._id,
  //   Boolean(video?._id && field2Prompt?.type && isSubmitted)
  // );
  // const { data: field3Result } = useGenerateHashtag(
  //   field3Prompt,
  //   video?._id,
  //   Boolean(video?._id && field3Prompt?.type && isSubmitted)
  // );
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([
      keys.VIDEOS,
      video?._id,
      "topic",
      "title",
      "hashtag",
    ]);
  }, [types]);

  /** Format seconds to hours:minutes:seconds */
  function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  }

  return (
    <ErrorBoundary>
      <div className="result">
        {result && isSubmitted && (
          <div className="result__title">
            <h2 className="result__title__title">Title</h2>
            {result.title ? (
              <div className="result__title__titleData">{result.title}</div>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        )}
        {/* {field2Prompt?.type && isSubmitted && (
          <div className="result__topics">
            <h2 className="result__topics__title">Topics</h2>
            <div className="result__topics__wrapper">
              {field2Result &&
                Array.isArray(field2Result.topics) &&
                field2Result.topics.map((topic) => (
                  <div className="result__topics__wrapper__topic" key={topic}>
                    {topic}
                  </div>
                ))}
              {field2Result && !field2Result.topics && (
                <p className="result__topics__wrapper__message">
                  No Topics available
                </p>
              )}
              {!field2Result && <LoadingSpinner />}
            </div>
          </div>
        )}
        {field3Prompt?.type && isSubmitted && (
          <div className="result__hashtags">
            <h2 className="result__hashtags__title">Hashtags</h2>
            <div className="result__hashtags__wrapper">
              {field3Result &&
                Array.isArray(field3Result.hashtags) &&
                field3Result.hashtags.map((hashtag) => (
                  <div
                    className="result__hashtags__wrapper__hashtag"
                    key={hashtag.hashtag}
                  >
                    #{hashtag}
                  </div>
                ))}
              {field3Result && !field3Result.hashtags && (
                <p className="result__hashtags__wrapper__message">
                  No Hashtags available
                </p>
              )}
              {!field3Result && <LoadingSpinner />}
            </div>
          </div>
        )} */}
      </div>
    </ErrorBoundary>
  );
}
