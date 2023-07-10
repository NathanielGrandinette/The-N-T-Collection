import React from "react";
import { categoryOptions } from "../utils/categoryOptions";
const Select = ({ handleChange, item, setSelectedCategory }) => {
  const handleSelected = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    <>
      {/* <label htmlFor="category">
        <strong>Category:</strong>
      </label> */}
      <select
        value={item?.category}
        name="category"
        className=" bg-[#36454F] text-sm ml-2 h-10 mt-5 mb-5 border-2 border-black text-[#9ca3af] p-2 rounded"
        onChange={
          handleChange ? (e) => handleChange(e) : handleSelected
        }
      >
        {categoryOptions.map((cat, i) => (
          <option key={cat.value} value={cat.value}>
            {cat.text}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
