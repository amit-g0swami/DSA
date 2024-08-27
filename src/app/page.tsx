import array from "@/features/array";

export default function Home() {
  return (
    <div>
      Hello World!
      <div>{array.twoSum([2, 7, 11, 15], 9)}</div>
    </div>
  );
}
