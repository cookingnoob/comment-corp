import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackStore } from "../stores/feedbackListStore";

export default function FeedbackList() {
  // const { isLoading, errorMessage, filteredFeedbackItems } =
  //   useFeedbackListContext();
  const isLoading = useFeedbackStore((state) => state.isLoading);
  const errorMessage = useFeedbackStore((state) => state.errorMessage);
  const filteredFeedbackItems = useFeedbackStore((state) =>
    state.getFilteredItems()
  );
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {filteredFeedbackItems.map((item) => (
        <FeedbackItem key={item.id} feedBackItem={item} />
      ))}
    </ol>
  );
}
