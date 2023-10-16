import { useRouter } from "next/router";
import React, { useState } from "react";
import FilterCat from "./FilterCat";

export default function CategoryFilter({
  categories,
  categoryHandler,
  replaceQuery,
}) {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false); // Inisialisasi showAll

  // const categories = category.map((item) => item._id); // Mengambil id dari category

  // Mengecek apakah ada query category di URL

  return (
    <div className="flex flex-col ml-8">
      <h1 className=" font-bold p-2">Kategori</h1>
      {categories.map((category, i) => (
        <div
          key={i}
          className={`cursor-pointer ${!showAll && i > 3 ? "hidden" : ""}`}
        >
          <FilterCat
            category={category}
            replaceQuery={replaceQuery}
            categoryHandler={categoryHandler}
          />
        </div>
      ))}
      <div className="flex flex-row justify-center mt-2">
        {!showAll && (
          <button
            className=" font-bold  text-xs p-1 rounded cursor-pointer"
            onClick={() => setShowAll(true)}
          >
            Show All &#x2193;
          </button>
        )}
        {showAll && (
          <button
            className=" font-bold  p-1 text-xs rounded cursor-pointer"
            onClick={() => setShowAll(false)}
          >
            Show Less &#x2191;
          </button>
        )}
      </div>
    </div>
  );
}
