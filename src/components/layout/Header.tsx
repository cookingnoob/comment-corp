import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";
import { useFeedbackStore } from "../stores/feedbackListStore";

export default function Header() {
  // const { handleAddToList } = useFeedbackListContext();
  const addItemToList = useFeedbackStore((state) => state.addToList);
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddItemToList={addItemToList} />
    </header>
  );
}
