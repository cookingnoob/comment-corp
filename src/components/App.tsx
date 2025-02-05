import { useEffect, useMemo, useState } from "react";
import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagList from "./hashtag/HashtagList";
import { TFeedbackItem } from "../lib/types";

function App() {
  const [feedBackList, setFeedbackList] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState("");

  const itemsForDisplay = useMemo(
    () =>
      filter ? feedBackList.filter((c) => c.company === filter) : feedBackList,
    [filter, feedBackList]
  );

  const companyNames = useMemo(
    () =>
      feedBackList
        .map((i) => i.company)
        .filter((name, index, array) => {
          return array.indexOf(name) === index;
        }),
    [feedBackList]
  );

  const addItemToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((w) => w.includes("#"))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      daysAgo: 0,
      text: text,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toLocaleUpperCase(),
    };

    setFeedbackList([...feedBackList, newItem]);

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };

  const addCompanyFilter = (name: string) => {
    setFilter(name);
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
        feedBackList={itemsForDisplay}
        errorMessage={errorMessage}
        isLoading={isLoading}
        addItemToList={addItemToList}
      />
      <HashtagList
        companyNames={companyNames}
        addCompanyFilter={addCompanyFilter}
      />
    </div>
  );
}

export default App;
