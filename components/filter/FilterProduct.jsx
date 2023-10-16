import React from "react";

export default function FilterProduct({ rating }) {
    console.log("rating",rating)
  return <div>{rating.review}</div>;
}
