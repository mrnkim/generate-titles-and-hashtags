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

  return (
    <ErrorBoundary>
      {result && isSubmitted && (
        <div className="result">
          {result.topics.length > 0 && (
            <div className="result__topics">
              <h2 className="result__topics__title">Topic</h2>
              <div className="result__topics__topics">
                {result.topics.map((topic) => (
                  <div className="result__topics__topic" key={topic}>
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          )}
          {(result.topics.length < 1 ||
            (result.topics.length > 0 && result.topics[0].length < 1)) && (
            <p>No topics available</p>
          )}
          {result.title.length >= 0 && (
            <div className="result__title">
              <h2 className="result__title__title">Title</h2>
              <div className="result__title__titleData">{result.title}</div>
            </div>
          )}
          {result.title.length < 1 && <p>No title available</p>}
          {result.hashtags && (
            <div className="result__hashtags">
              <h2 className="result__hashtags__title">Hashtags</h2>
              <div className="result__hashtags__hashtags">
                {result.hashtags.map((hashtag) => (
                  <div className="result__hashtags__hashtag" key={hashtag}>
                    #{hashtag}
                  </div>
                ))}
              </div>
            </div>
          )}
          {(result.hashtags.length < 1 ||
            (result.hashtags.length > 0 && result.hashtags[0].length < 1)) && (
            <p>No hashtags available</p>
          )}
        </div>
      )}
    </ErrorBoundary>
  );
}
