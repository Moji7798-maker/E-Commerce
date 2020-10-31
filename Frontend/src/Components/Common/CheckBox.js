import React, { useState } from "react";

const CheckBox = ({ items, handleFilter }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (id) => (e) => {
    let justCheckedIndex = checked.indexOf(id);
    let newChecked = [...checked];
    if (justCheckedIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(justCheckedIndex, 1);
    }
    setChecked(newChecked);
    handleFilter(newChecked);
  };

  return (
    <>
      {items.map((c, i) => (
        <div className="filter-input-group" key={i}>
          <input
            type="checkbox"
            id={c.name}
            onChange={handleToggle(c._id)}
            value={checked.indexOf(c._id) !== -1}
          />
          <label htmlFor={c.name}>{c.name}</label>
        </div>
      ))}
    </>
  );
};

export default CheckBox;
