import React from "react";

export default function UserReview({ review }) {
  console.log("review", review);

  const { name, image } = review.reviewBy;

  return (
    <div>
      <div className="">
        <h1>{name.slice(0, 1)}***{name.slice(name.length -1)}</h1>
        <img
          src={image}
          alt=""
          className=" h-6 w-6 rounded-full blur-[0.7px]"
        />
      </div>
    </div>
  );
}
