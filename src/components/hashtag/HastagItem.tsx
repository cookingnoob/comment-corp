type HastagElementProps = {
  name: string;
  addCompanyFilter: (name: string) => void;
};
export default function HastagItem({
  name,
  addCompanyFilter,
}: HastagElementProps) {
  return (
    <li>
      <button onClick={() => addCompanyFilter(name)}>#{name}</button>
    </li>
  );
}
