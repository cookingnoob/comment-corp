import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../components/context/FeedbackItemsContext";
import { TFeedbackItem } from "./types";

export function useFeedbackListContext() {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw Error("no funciona el contexto FeedbackItemsContex");
  }
  return context;
}

export function useFeedbackList() {
  const [feedBackList, setFeedbackList] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchFeedbackData = async () => {
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setFeedbackList(data.feedbacks);
      } catch (error) {
        setErrorMessage("Something went wrong");
      }
      setIsLoading(false);
    };
    fetchFeedbackData();
  }, []);

  return {
    feedBackList,
    isLoading,
    errorMessage,
    setFeedbackList,
  };
}
