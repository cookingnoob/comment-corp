import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

export default function FeedbackList() {
  const [feedBackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        setFeedbackList(data.feedbacks);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage("Something went wrong");
        setIsLoading(false);
      });
  }, []);

  return (
    <ol className="feedback-list">
      {isLoading ? <Spinner /> : null}
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      {feedBackList.map((item) => (
        <FeedbackItem key={item.id} feedBackItem={item} />
      ))}
    </ol>
  );
}
