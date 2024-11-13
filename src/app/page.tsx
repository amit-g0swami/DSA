"use client";
import array from "@/features/array";
import PhoneApp from "@/features/features/PhoneApp";

export default function Home() {
  return (
    <div>
      Hello World!
      <div>{array.twoSum([2, 7, 11, 15], 9)}</div>
      <PhoneApp />
    </div>
  );
}
