import React, { useState } from "react";

export default function BrandFilter({ brandHandler, replaceQuery }) {
  const merk = [
    {
      name: "Boho",
    },
    {
      name: "Drawstring",
    },
    {
      name: "Metallic",
    },
    {
      name: "Asus",
    },
    {
      name: "Acer",
    },
    {
      name: "Apple",
    },
    {
      name: "Dell",
    },
  ];

  const [showAll, setShowAll] = useState(false); // Inisialisasi showAll

  return (
    <div className="">
      <div className=" ml-6 font-bold p-2">Brand</div>
        {merk.map((item, index) => {
          const check = replaceQuery("brand", item.name);
          return (
            <div key={index} className="flex justify-center  ">
              <button
                className={` mb-1 hover:bg-blue-300 ${
                  !showAll && index > 2 ? "hidden" : ""
                } text-sm p-1 rounded cursor-pointer
              ${check.active ? "bg-blue-300 text-white" : ""}

              }`}
                onClick={() => brandHandler(check.result)}
              >
                {item.name}
              </button>
            </div>
          );
        })}

        <div className="flex justify-center mt-1">
          {showAll && (
            <button
              className=" font-bold  p-1 text-xs rounded cursor-pointer"
              onClick={() => setShowAll(false)}
            >
              Show Less &#x2191;
            </button>
          )}
          {!showAll && (
            <button
              className=" font-bold  text-xs p-1 rounded cursor-pointer"
              onClick={() => setShowAll(true)}
            >
              Show All &#x2193;
            </button>
          )}
        </div>
    </div>
  );
}
