import React, { useState } from "react";

const DEFAULT_INPUT = {
  id: 1,
  phoneNumber: "test",
};

interface IDictionary {
  id: number;
  phoneNumber: string;
}

function PhoneApp() {
  const [dictionaryList, setDictionaryList] = useState<IDictionary[]>([
    DEFAULT_INPUT,
  ]);
  const [filteredDictionaryList, setFilteredDictionaryList] = useState<
    IDictionary[]
  >([DEFAULT_INPUT]);
  const [searchedValue, setSearchedValue] = useState<string | null>(null);
  const [showAddField, setShowEditField] = useState<boolean>(false);
  const [addNumber, setAddNumber] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchedValue(value);
    if (!value) return setFilteredDictionaryList(dictionaryList);
    const updatedList = dictionaryList.filter((item) =>
      item.phoneNumber.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDictionaryList(updatedList);
  };

  const handleClearSearch = () => {
    setSearchedValue(null);
    setFilteredDictionaryList([...dictionaryList]);
  };

  const handleAddClicked = () => {
    setShowEditField(true);
  };

  const handleAddNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddNumber(value);
  };

  const resetState = () => {
    setSearchedValue(null);
    setShowEditField(false);
    setAddNumber(null);
  };

  const handleAdd = () => {
    if (!addNumber) return;
    const payload = {
      id: 2,
      phoneNumber: addNumber,
    };
    const updatedList = [...dictionaryList, payload];
    setDictionaryList(updatedList);
    setFilteredDictionaryList(updatedList);
    resetState();
  };

  const handleCancel = () => {
    resetState();
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <span>Phone App</span>
        <div className="flex">
          <input
            name="searchedItem"
            placeholder="Search a number"
            value={searchedValue || ""}
            onChange={(e) => handleSearch(e)}
          />
          <button onClick={() => handleClearSearch()}>Clear</button>
        </div>
      </div>
      <div className="flex">
        {filteredDictionaryList.map((list) => (
          <div key={list.id}>{list.phoneNumber}</div>
        ))}
        {showAddField && (
          <div className="flex">
            <input
              placeholder="Enter Number"
              name="addNumber"
              value={addNumber || ""}
              onChange={(e) => handleAddNumber(e)}
            />
            <button onClick={() => handleAdd()}>Add</button>
            <button onClick={() => handleCancel()}>Cancel</button>
          </div>
        )}
        <button onClick={() => handleAddClicked()}>Add Number</button>
      </div>
    </div>
  );
}

export default PhoneApp;
