import React from "react";
import { Link } from "react-router-dom";

const GoBack = ({ address }) => {
  return (
    <div className="go-back">
      <Link to={address}>بازگشت</Link>
    </div>
  );
};

export default GoBack;
