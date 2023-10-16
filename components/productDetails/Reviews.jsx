import React, { useState } from "react";
import FilterRating from "../filter/FilterRating";
import FilterProduct from "../filter/FilterProduct";
import ResultFilter from "./ResultFilter";

export default function Reviews({ review }) {
  const [pilihRating, setPilihRating] = useState(null);

  let reviews = review;
  console.log("reviews",review)

  const handleChange = (e) => {
    setPilihRating(e.target.value);
  };

  function filteredData(reviews, selected, query) {
    let filteredProducts = reviews;
    console.log("filteredProducts",filteredProducts)

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ rating }) => rating === selected
      );
    }

    return filteredProducts.map(({ rating }) => (
      <FilterProduct key={Math.random()} rating={rating} />
    ));
  }

  const result = filteredData(reviews,pilihRating)

  return (
    <div>
      <div>
        <FilterRating handleChange={handleChange} />
        <ResultFilter result={result}/>
      </div>
    </div>
  );
}
