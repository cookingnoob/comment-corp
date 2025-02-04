import HastagItem from "./HastagItem";

type HasTagListProps = {
  companyNames: string[];
  addCompanyFilter: (name: string) => void;
};

export default function HashtagList({
  companyNames,
  addCompanyFilter,
}: HasTagListProps) {
  return (
    <ul className="hashtags">
      {companyNames.map((name) => {
        return (
          <HastagItem
            key={name}
            name={name}
            addCompanyFilter={addCompanyFilter}
          />
        );
      })}
    </ul>
  );
}
