import { useRouter } from "next/router";
import React from "react";
import { BsCheckLg } from "react-icons/bs";

export default function SortProducts({ sortHandler, priceSortHandler }) {
  const router = useRouter();

  const sortingOptions = [
    {
      name: "Rekomendasi",
      value: "",
    },
    {
      name: "Popular",
      value: "popular",
    },
    {
      name: "Terbaru",
      value: "newest",
    },
    {
      name: "Harga: Terendah - Tertinggi",
      value: "priceLowToHigh",
    },
    {
      name: "Harga: Tertinggi - Terendah",
      value: "priceHighToLow",
    },
  ];

  const sortQuery = router.query.sort || "";

  return (
    <div className=" bg-gray-300 mt-2 rounded-md ">
      <div className="flex">
        <ul className="flex gap-5 text-base p-5">
          {sortingOptions.map((option, i) => (
            <li
              key={i}
              onClick={() => sortHandler(option.value)}
              className={`flex bg-white p-2 text-sm cursor-pointer rounded-sm hover:bg-teal-300 ${
                sortQuery == option.value ? " bg-teal-300 text-white" : ""
              }`}
            >
              <a className="flex">
                {option.name}
                {/* {sortQuery == option.value ? <BsCheckLg /> : ""} */}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
