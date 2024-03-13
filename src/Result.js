import { React, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import "./Result.css";
import { useGenerateTitleTopicHashtag } from "./apiHooks";
import keys from "./keys";
import { ErrorBoundary } from "./ErrorBoundary";

/** Shows the results
 *
 * GenerateTitlesAndHashtags -> Result
 *
 */

export function Result({ video, isSubmitted, types }) {
  const { data: result } = useGenerateTitleTopicHashtag(
    types,
    video?._id,
    Boolean(video?._id && types?.size > 0 && isSubmitted)
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([keys.VIDEOS, video?._id, "gist"]);
  }, [types]);

  return (
    <ErrorBoundary>
      {result && isSubmitted && (
        <div className="result">
          {result.topics?.length > 0 && (
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
          {(result.topics?.length < 1 ||
            (result.topics?.length > 0 && result.topics[0].length < 1)) && (
            <p>No topics available</p>
          )}
          {result.title?.length >= 0 && (
            <div className="result__title">
              <h2 className="result__title__title">Title</h2>
              <div className="result__title__titleData">{result.title}</div>
            </div>
          )}
          {result.title?.length < 1 && <p>No title available</p>}
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
          {result.hashtags &&
            (result.hashtags.length < 1 ||
              (result.hashtags.length > 0 &&
                result.hashtags[0].length < 1)) && <p>No hashtags available</p>}
        </div>
      )}
    </ErrorBoundary>
  );
}
