import FeedbackItem from "./FeedbackItem";

const feedBackList = [
  {
    upvoteCount: 500,
    badgeLetter: "B",
    companyName: "Bytegrad",
    text: "lorem lorem lorem",
    daysAgo: 4,
  },
  {
    upvoteCount: 494,
    badgeLetter: "S",
    companyName: "Starbucks",
    text: "mmmm que rico #cafe!!",
    daysAgo: 5,
  },
];

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      {feedBackList.map((item) => (
        <FeedbackItem feedBackItem={item} />
      ))}
    </ol>
  );
}
