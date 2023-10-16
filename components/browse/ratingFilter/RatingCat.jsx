import { Rating } from "@mui/material";
import React from "react";

export default function RatingCat({ rating, replaceQuery, ratingHandler }) {
  const check = replaceQuery("rating", rating.value);
  const isAllRating = rating.value[0] === ""; // Menyimpan apakah ini adalah "All" rating

  return (
    <>
      <section>
        <div
          className="cursor-pointer"
          onClick={() => ratingHandler(rating.value)}
        >
          <input
            type="radio"
            // name="filter"
            id={rating.value}
            checked={check.active}
            className="hidden" // Menggunakan kelas "hidden" dari Tailwind CSS untuk menyembunyikan input radio
          />
          <label
            className={`px-1 w-24 flex cursor-pointer hover:bg-blue-gray-100 ${
              check.active && !isAllRating ? " bg-blue-gray-100" : ""
            } rounded p-1`}
            htmlFor={rating.value}
          >
            {isAllRating ? (
              <div className=" text-yellow-900 flex flex-row w-24 justify-center text-[15px] font-bold">
                All
              </div>
            ) : (
              <Rating
                name="read-only"
                value={rating.value}
                readOnly
                size="small"
              />
            )}
          </label>
        </div>
      </section>
    </>
  );
}
