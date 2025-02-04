import { TFeedbackItem } from "../lib/types";
import ErrorMessage from "./ErrorMessage";
import FeedbackList from "./FeedbackList";
import Header from "./Header";

type ContainerProps = {
  feedBackList: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
};

export default function Container({
  feedBackList,
  isLoading,
  errorMessage,
}: ContainerProps) {
  return (
    <main className="container">
      <Header />
      <FeedbackList
        feedBackList={feedBackList}
        isLoading={isLoading}
        errorMessage={ErrorMessage}
      />
    </main>
  );
}
