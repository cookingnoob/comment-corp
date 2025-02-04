import { TriangleUpIcon } from "@radix-ui/react-icons";

type FeedbackItem = {
  upvoteCount: number;
  badgeLetter: string;
  companyName: string;
  text: string;
  daysAgo: number;
};

type FeedBackItemProps = {
  feedBackItem: FeedbackItem;
};

export default function FeedbackItem({ feedBackItem }: FeedBackItemProps) {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{feedBackItem.upvoteCount}</span>
      </button>
      <div>
        <p>{feedBackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedBackItem.companyName}</p>
        <p>{feedBackItem.text}</p>
      </div>

      <p>{feedBackItem.daysAgo}D</p>
    </li>
  );
}
