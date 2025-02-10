import { useFeedbackStore } from "../stores/feedbackListStore";
import HastagItem from "./HastagItem";

export default function HashtagList() {
  // const { CompanyList, handleSelectCompany } = useFeedbackListContext();
  const companyList = useFeedbackStore((state) => state.getCompanyList());
  const selectCompany = useFeedbackStore((state) => state.selectCompany);

  return (
    <ul className="hashtags">
      {companyList.map((name) => {
        return (
          <HastagItem key={name} name={name} addCompanyFilter={selectCompany} />
        );
      })}
    </ul>
  );
}
