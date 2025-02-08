import { useFeedbackListContext } from "../../lib/hooks";
import HastagItem from "./HastagItem";

export default function HashtagList() {
  const { CompanyList, handleSelectCompany } = useFeedbackListContext();

  return (
    <ul className="hashtags">
      {CompanyList.map((name) => {
        return (
          <HastagItem
            key={name}
            name={name}
            addCompanyFilter={handleSelectCompany}
          />
        );
      })}
    </ul>
  );
}
