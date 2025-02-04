import HastagItem from "./HastagItem";

type HasTagListProps = {
  companyNames: string[];
};

export default function HashtagList({ companyNames }: HasTagListProps) {
  return (
    <ul className="hashtags">
      {companyNames.map((name) => {
        return <HastagItem name={name} />;
      })}
    </ul>
  );
}
