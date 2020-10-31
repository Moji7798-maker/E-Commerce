import React, { useState } from "react";

const RadioButton = ({ items, handleFilter }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    handleFilter(e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      {items.map((c, i) => (
        <div key={i} className="filter-input-group">
          <input
            type="radio"
            id={c.name}
            value={c._id}
            name={"price-range"}
            onChange={handleChange}
          />
          <label htmlFor={c.name}>{c.name}</label>
        </div>
      ))}
    </>
  );
};

export default RadioButton;
