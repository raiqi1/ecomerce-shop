import React from "react";
import RatingCat from "./RatingCat";

export default function RatingFilter({ ratingHandler,replaceQuery }) {
  const start = [
    {
      value: [""],
      name: "All",
    },
    {
      value: 1,
      name: "bintang 1",
    },
    {
      value: 2,
      name: "bintang 2",
    },
    {
      value: 3,
      name: "bintang 3",
    },
    {
      value: 4,
      name: "bintang 4",
    },
    {
      value: 5,
      name: "bintang 5",
    },
  ];

  return (
    <div className="ml-8">
        <h1 className=" font-bold p-2">Rating</h1>
        {start.map((item, index) => (
          <div key={index}>
            <RatingCat
              rating={item}
              ratingHandler={ratingHandler}
              replaceQuery={replaceQuery}
            />
          </div>
        ))}
      
    </div>
  );
}
