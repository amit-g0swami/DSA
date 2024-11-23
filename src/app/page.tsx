"use client";
import React from "react";
import array from "@/features/array";
import PhoneApp from "@/features/features/PhoneApp";

export default function Home() {
  const [value, setValue] = React.useState("");

  return (
    <div className="p-6">
      Hello World!
      <div>{array.twoSum([2, 7, 11, 15], 9)}</div>
      <input
        type="number"
        min={0}
        max={100}
        placeholder="Enter a number between 0 and 100"
        className="w-1/4 p-2"
      />
      <PhoneApp />
      <form>
        <input
          type="number"
          min={0}
          max={100}
          placeholder="Enter a number between 0 and 100"
          className="w-1/4 p-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
