import { useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../../lib/types";
import { FeedbackItemsContext } from "./FeedbackItemsContext";

type FeedbackItemsContextProviderprops = {
  children: React.ReactNode;
};

export function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderprops) {
  const [feedBackList, setFeedbackList] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const CompanyList = useMemo(
    () =>
      feedBackList
        .map((i) => i.company)
        .filter((name, index, array) => {
          return array.indexOf(name) === index;
        }),
    [feedBackList]
  );
  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedBackList.filter((c) => c.company === selectedCompany)
        : feedBackList,
    [selectedCompany, feedBackList]
  );

  const handleAddToList = async (text: string) => {
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
  const handleSelectCompany = (name: string) => {
    setSelectedCompany(name);
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
    <FeedbackItemsContext.Provider
      value={{
        feedBackList,
        filteredFeedbackItems,
        isLoading,
        errorMessage,
        CompanyList,
        handleAddToList,
        handleSelectCompany,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
