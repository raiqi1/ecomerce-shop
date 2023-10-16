import React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const RatingFilter = ({ onFilter, activeFilter, review }) => {
  const ratingCounts = {};

  // Count the number of review for each rating
  review.forEach((product) => {
    const rating = Math.floor(product.rating);
    ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
  });

  return (
    <div className="mb-4 ">
      {/* <label className="text-lg font-semibold">Filter by Rating:</label> */}
      <button
        onClick={() => onFilter(null)} // Set the filter to null for "All Ratings"
        className={`border p-2 rounded-sm ml-2 bg-white ${
          activeFilter === null
            ? " outline outline-1 outline-red-300 "
            : "bg-gray-200  text-gray-800"
        }`}
      >
        All Ratings ({review.length})
      </button>
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          onClick={() => onFilter(rating)}
          className={`border p-2 rounded-sm ml-2 bg-white ${
            activeFilter === rating
              ? " outline outline-1 outline-red-300 "
              : "bg-gray-200  text-gray-800"
          }`}
        >
          <Rating
            name={`rating-${rating}`}
            value={rating}
            precision={0.5}
            readOnly
            size="small"
          />
          ({ratingCounts[rating] || 0})
        </button>
      ))}
    </div>
  );
};

export default RatingFilter;
