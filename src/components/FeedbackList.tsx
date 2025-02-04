import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";

export default function FeedbackList() {
  const [feedBackList, setFeedbackList] = useState([]);
  useEffect(() => {
    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    )
      .then((response) => response.json())
      .then((data) => setFeedbackList(data.feedbacks));
  }, []);
  return (
    <ol className="feedback-list">
      {feedBackList.map((item) => (
        <FeedbackItem key={item.id} feedBackItem={item} />
      ))}
    </ol>
  );
}
