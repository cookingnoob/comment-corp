import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagList from "./hashtag/HashtagList";
import { useEffect } from "react";
import { useFeedbackStore } from "./stores/feedbackListStore";

function App() {
  const fetchFeedbackList = useFeedbackStore(
    (state) => state.fetchFeedbackList
  );
  useEffect(() => {
    fetchFeedbackList();
  }, [fetchFeedbackList]);
  return (
    <div className="app">
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}

export default App;
