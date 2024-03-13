import { React, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import keys from "./keys";
import "./InputForm.css";

/** Receive user's check prompt for the API call
 *
 * GenerateTitlesAndHashtags -> {InputForm}
 *
 */
export function InputForm({
  video,
  field1,
  field2,
  field3,
  setIsSubmitted,
  setShowVideoTitle,
  setShowCheckWarning,
  types,
}) {
  const queryClient = useQueryClient();

  const topicRef = useRef(null);
  const titleRef = useRef(null);
  const hashtagRef = useRef(null);

  /** Combine user input and make API call(s)  */
  async function handleClick(event) {
    event.preventDefault();

    if (topicRef.current?.checked) {
      types.add(field1);
    } else {
      types.delete(field1);
    }

    if (titleRef.current?.checked) {
      types.add(field2);
    } else {
      types.delete(field2);
    }

    if (hashtagRef.current?.checked) {
      types.add(field3);
    } else {
      types.delete(field3);
    }

    if (
      !topicRef.current?.checked &&
      !titleRef.current?.checked &&
      !hashtagRef.current?.checked
    ) {
      setShowVideoTitle(false);
      setShowCheckWarning(true);
      return;
    }

    setIsSubmitted(true);
    setShowVideoTitle(true);
    setShowCheckWarning(false);

    queryClient.invalidateQueries([keys.VIDEOS, video._id, "gist"]);
  }

  useEffect(() => {
    topicRef.current.checked = true;
    titleRef.current.checked = true;
    hashtagRef.current.checked = true;
  }, []);

  return (
    <div className="inputForm">
      <div className="inputForm__title">Choose a topic format</div>
      <form className="inputForm__form">
        <div className="inputForm__form__checkboxes">
          <div className="inputForm__form__checkboxes__wrapper">
            <input
              className="inputForm__form__checkboxes__wrapper__checkbox"
              type="checkbox"
              data-cy="data-cy-checkbox-topic"
              id={field1}
              name={field1}
              ref={topicRef}
            />
            <label
              className="inputForm__form__checkboxes__wrapper__label"
              htmlFor={field1}
            >
              {field1}
            </label>
          </div>
          <div className="inputForm__form__checkboxes__wrapper">
            <input
              className="inputForm__form__checkboxes__wrapper__checkbox"
              type="checkbox"
              ref={titleRef}
              data-cy="data-cy-checkbox-title"
              id={field2}
              name={field2}
            />
            <label
              className="inputForm__form__checkboxes__wrapper__label"
              htmlFor={field2}
            >
              {field2}
            </label>
          </div>
          <div className="inputForm__form__checkboxes__wrapper">
            <input
              className="inputForm__form__checkboxes__wrapper__checkbox"
              type="checkbox"
              ref={hashtagRef}
              data-cy="data-cy-checkbox-hashtag"
              id={field3}
              name={field3}
            />
            <label
              className="inputForm__form__checkboxes__wrapper__label"
              htmlFor={field3}
            >
              {field3}s
            </label>
          </div>
        </div>
        <button
          className="inputForm__form__button"
          data-cy="data-cy-generate-button"
          onClick={handleClick}
        >
          Generate
        </button>{" "}
      </form>
    </div>
  );
}
