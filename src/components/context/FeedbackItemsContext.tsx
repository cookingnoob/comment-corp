import { createContext } from "react";
import { TFeedbackItem } from "../../lib/types";

type TFeedbackItemsContext = {
  feedBackList: TFeedbackItem[];
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  CompanyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (text: string) => void;
};
export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);
