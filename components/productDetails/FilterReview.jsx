import React, { useState, useEffect } from "react";
import RatingFilter from "./RatingFilter";
// import { reviews } from "../db"; // Import product data from db.js
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import UserReview from "./UserReview";
import DateReview from "./DateReview";

const FilterReview = ({ reviews }) => {
  const [filteredRating, setFilteredRating] = useState(null); // Default to "All Ratings"
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(2); // Number of review per page
  const [review, setReview] = useState([]);

  // Fetch or load your review data here
  useEffect(() => {
    // Simulate fetching review data (replace with your actual data loading logic)
    setTimeout(() => {
      setReview(reviews);
      setCurrentPage(1); // Set the current page to 1 when review are loaded
    }, 1000); // Simulated delay to mimic data fetching
  }, []);

  const handleRatingFilter = (rating) => {
    setFilteredRating(rating);
    setCurrentPage(1); // Reset to the first page when the rating filter changes
  };

  // Get current review based on rating filter
  const currentProducts = review.filter((product) => {
    if (filteredRating === null) {
      return true; // No filter applied, show all review
    } else {
      return Math.floor(product.rating) === filteredRating; // Filter by selected rating
    }
  });

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const displayedProducts = currentProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const overallCumulativeRating =
    review.reduce((total, product) => total + product.rating, 0) /
    review.length;

  console.log("overallCumulativeRating", overallCumulativeRating);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className=" p-2 text-xl">Penilaian Produk</h1>
      <div className="text-base p-8 mt-2 flex bg-red-50/50 outline outline-red-100 outline-1">
        <div>
          <div className="flex justify-center gap-1 text-orange-900">
            {reviews.length > 0 ? (
              <div className="flex gap-1">
                <h1 className=" flex justify-center text-2xl">
                  {overallCumulativeRating.toFixed(1)}
                </h1>
                <p className="flex flex-col justify-end">
                  dari {reviews.length}{" "}
                </p>
              </div>
            ) : (
              "No Reviews"
            )}
          </div>
          <span className="">
            <Rating
              name="cumulative-rating-overall"
              value={overallCumulativeRating}
              precision={0.5}
              readOnly
              sx={{ fontSize: "27px" }}
            />
          </span>
        </div>
        <RatingFilter
          onFilter={handleRatingFilter}
          activeFilter={filteredRating}
          review={review}
        />
      </div>

      <div className="divide-y divide-gray-300 ">
        {displayedProducts.map((product) => (
          <div key={product.id} className=" flex p-2 gap-2">
            <div className=" w-6">
              <img
                src={product.reviewBy.image}
                className=" h-6 w-6 rounded-full blur-[0.8px]"
                alt=""
              />
            </div>
            <div className="">
              <h1>
                {product.reviewBy.name.slice(0, 1)}***
                {product.reviewBy.name.slice(product.reviewBy.name.length - 1)}
              </h1>
              <Rating
                name={`rating-${product.id}`}
                value={product.rating}
                precision={0.5}
                readOnly
                size="small"
                sx={{ alignContent: "center" }}
              />
              <div className=" text-xs flex gap-1 divide-x-2 divide-gray-300">
                <div className=" flex">
                  {product.updatedAt ? (
                    <div>
                      <h1>{product.updatedAt.split("T")[0]}</h1>
                      <p>
                        <DateReview time={product.updatedAt} />
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <h1 className=" px-2 flex flex-col justify-center">
                    Size : {product.size}
                  </h1>
                </div>
              </div>
              <div>
                <h1>{product.review}</h1>
              </div>
              <div className="ml-2 flex gap-3">
                <div>
                  {product.images.map((im, i) => (
                    <div>
                      <img src={im.url} alt="" className=" h-12 w-12" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <ul className="flex space-x-2">
          {Array.from(
            { length: Math.ceil(currentProducts.length / productsPerPage) },
            (_, i) => (
              <li key={i}>
                <button
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-blue-200 text-gray-800"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default FilterReview;
