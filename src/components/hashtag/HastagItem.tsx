type HastagElementProps = {
  name: string;
};
export default function HastagItem({ name }: HastagElementProps) {
  return (
    <li key={name}>
      <button>#{name}</button>
    </li>
  );
}
