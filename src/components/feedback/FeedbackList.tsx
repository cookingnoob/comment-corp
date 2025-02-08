import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackListContext } from "../../lib/hooks";

export default function FeedbackList() {
  const { isLoading, errorMessage, feedBackList } = useFeedbackListContext();
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedBackList.map((item) => (
        <FeedbackItem key={item.id} feedBackItem={item} />
      ))}
    </ol>
  );
}
