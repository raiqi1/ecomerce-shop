import React from "react";

export default function FilterCat({ category, replaceQuery, categoryHandler }) {
  const check = replaceQuery("category", category._id);

  return (
    <>
      <section>
        <div className="" onClick={()=> categoryHandler(category._id)}>
          <input
            type="radio"
            name="filter"
            id={category._id}
            checked={check.active}
          />
          <label className=" px-3 text-sm" htmlFor={category._id}>{category.name}</label>
        </div>
      </section>
    </>
  );
}
