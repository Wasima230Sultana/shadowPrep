


import React, { use, useContext } from "react";
import Categories from "./Categories";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const data = fetch("/categories.json").then((response) => response.json());

const Category = () => {
  const category = use(data);
  const { user } = useContext(AuthContext);

  // If user exists, show all categories; otherwise show only first 6
  const visibleCategories = user ? category : category.slice(0, 6);

  return (
    <div className="bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0f172a] text-white py-2 px-4 border-t border-white/10">
      <h2 className="font-bold text-3xl text-center my-4">
        Popular Interview Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {visibleCategories.map((cat) => (
          <Categories key={cat.id} cat={cat} />
        ))}
      </div>

      {!user && category.length > 6 && (
        <div className="text-center mt-8 mb-5">
          <p className="text-gray-400 mb-4">
            Login to unlock all interview categories.
          </p>

          <Link to="/auth/login"
            className="bg-[#8b5cf6] text-white px-6 py-2 rounded-lg hover:bg-[#7c3aed] transition"
          >
            Login Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Category;