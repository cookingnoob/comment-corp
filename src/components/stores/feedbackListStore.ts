import { create } from "zustand";
import { TFeedbackItem } from "../../lib/types";

type Store = {
  feedbackList: TFeedbackItem[];
  selectedCompany: string;
  isLoading: boolean;
  errorMessage: string;
  getCompanyList: () => string[];
  getFilteredItems: () => TFeedbackItem[];
  addToList: (text: string) => Promise<void>;
  selectCompany: (text: string) => void;
  fetchFeedbackList: () => Promise<void>;
};

export const useFeedbackStore = create<Store>((set, get) => ({
  feedbackList: [],
  selectedCompany: "",
  isLoading: false,
  errorMessage: "",
  getCompanyList: () => {
    return get()
      .feedbackList.map((i) => i.company)
      .filter((name, index, array) => {
        return array.indexOf(name) === index;
      });
  },
  getFilteredItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackList.filter((c) => c.company === state.selectedCompany)
      : state.feedbackList;
  },
  addToList: async (text: string) => {
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

    //   setFeedbackList([...feedBackList, newItem]);
    set((state) => ({ feedbackList: [...state.feedbackList, newItem] }));

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
  },
  selectCompany: (name: string) => {
    // setSelectedCompany(name);
    set(() => ({ selectedCompany: name }));
  },
  fetchFeedbackList: async () => {
    // setIsLoading(true);
    set(() => ({ isLoading: true }));
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      //   setFeedbackList(data.feedbacks);
      set(() => ({ feedbackList: data.feedbacks, isLoading: false }));
    } catch (error) {
      //   setErrorMessage("Something went wrong");
      set(() => ({ errorMessage: "Something went wrong", isLoading: false }));
    }
  },
}));
