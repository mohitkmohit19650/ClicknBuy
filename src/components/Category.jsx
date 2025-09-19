import React from "react";
import { getDataHook } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { categories } = getDataHook();
  const navigate = useNavigate();
  return (
    <ul className="uniqueCategory flex">
      {categories.map((cat, index) => (
        <li key={index} className="capitalize">
            <button onClick={()=> navigate(`/category/${cat}`)} >{cat}</button>
        </li>
      ))}
    </ul>
  );
};

export default Category;
