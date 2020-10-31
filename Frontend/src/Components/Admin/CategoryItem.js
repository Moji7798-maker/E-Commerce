import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category, onDelete = (f) => f }) => {
  return (
    <>
      <div className="category">
        <div className="category-title">
          <span>{category.name}</span>
        </div>
        <div className="category-actions">
          <Link to={`/category/update/${category._id}`}>
            <span className="category-update">
              <i className="fas fa-edit"></i>
            </span>
          </Link>
          <span
            className="category-delete"
            onClick={() => onDelete(category._id)}
          >
            <i className="fas fa-trash"></i>
          </span>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;
