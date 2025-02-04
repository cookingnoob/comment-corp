import { TFeedbackItem } from "../lib/types";
import FeedbackList from "./FeedbackList";
import Header from "./Header";

type ContainerProps = {
  feedBackList: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  addItemToList: (text: string) => void;
};

export default function Container({
  feedBackList,
  isLoading,
  errorMessage,
  addItemToList,
}: ContainerProps) {
  return (
    <main className="container">
      <Header addItemToList={addItemToList} />
      <FeedbackList
        feedBackList={feedBackList}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </main>
  );
}
