import { React, Suspense, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import keys from "./keys";
import LoadingSpinner from "./LoadingSpinner";
import { useGetTask } from "./apiHooks";
import "./Task.css";
import dummyImage from "./upload.png";
import { Video } from "./Video";

/** Gets and shows status of a task
 *
 * VideoUrlUploadForm -> Task
 *
 */
export function Task({
  taskId,
  refetchVideos,
  setIsFileUploading,
}) {
  const { data: task } = useGetTask(taskId);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (task && (task.status === "ready" || task.status === "failed")) {
      // setIsFileUploading(false);
      // setShowCheckWarning(false);
      refetchVideos();
    }
  }, [task, task.status]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [keys.TASK, taskId],
    });
  }, [queryClient, keys.TASK, taskId]);

  return (
    <div className="task">
      {task.hls?.video_url && <LoadingSpinner />}
      {!task.hls?.thumbnail_urls && (
        <LoadingSpinner />
        // <div className="task__dummyImage">
        //   <img src={dummyImage} alt="Thumbnail" className="task__dummyImage__imageAnimation"/>
        // </div>
      )}
      <div className="task__status">
        {task && task.status ? `${task.status}...` : null}
      </div>
      <ErrorBoundary>
        {task.hls?.video_url && (
          <div className="task__video">
            <Video url={task.hls.video_url} width={"381px"} height={"214px"} />
          </div>
        )}
        <Suspense fallback={<LoadingSpinner />}></Suspense>
      </ErrorBoundary>
    </div>
  );
}
