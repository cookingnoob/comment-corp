import { useEffect, useState } from "react";
import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import { TFeedbackItem } from "../lib/types";

function App() {
  const [feedBackList, setFeedbackList] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addItemToList = (text: string) => {
    const companyName = text
      .split(" ")
      .find((w) => w.includes("#"))!
      .substring(1);
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      daysAgo: 0,
      text: text,
      companyName: companyName,
      badgeLetter: companyName.substring(0, 1).toLocaleUpperCase(),
    };
    setFeedbackList([...feedBackList, newItem]);
  };

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

  return (
    <div className="app">
      <Footer />
      <Container
        feedBackList={feedBackList}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
      <HashtagList />
    </div>
  );
}

export default App;
