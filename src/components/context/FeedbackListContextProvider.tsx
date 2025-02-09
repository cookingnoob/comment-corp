import { useMemo, useState } from "react";
import { TFeedbackItem } from "../../lib/types";
import { FeedbackItemsContext } from "./FeedbackItemsContext";
import { useFeedbackList } from "../../lib/hooks";

type FeedbackItemsContextProviderprops = {
  children: React.ReactNode;
};

export function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderprops) {
  const { isLoading, feedBackList, errorMessage, setFeedbackList } =
    useFeedbackList();
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

  return (
    <FeedbackItemsContext.Provider
      value={{
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
