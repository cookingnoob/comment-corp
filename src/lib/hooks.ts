import { useContext } from "react";
import { FeedbackItemsContext } from "../components/context/FeedbackItemsContext";

export function useFeedbackListContext() {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw Error("no funciona el contexto FeedbackItemsContex");
  }
  return context;
}
