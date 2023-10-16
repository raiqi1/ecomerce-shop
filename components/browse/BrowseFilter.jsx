import Link from "next/link";
import React, { useState } from "react";

export default function BrowseFilter({ kategori }) {
  const [showAll, setShowAll] = useState(false);

  console.log("kategori", kategori);
  return (
    <div>
      <h1>Kategori</h1>
      <div>
        {kategori.map((k, index) => (
          <div
            key={k._id}
            className={` cursor-pointer ${
              index > 1 && !showAll ? "hidden" : ""
            }`}
          >
            <Link href={`/browse?category=${k._id}`}>{k.name}</Link>
          </div>
        ))}
      </div>
      <div>
        {
          <div
            className="cursor-pointer bg-blue-gray-300 "
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : "Show All"}
          </div>
        }
      </div>
    </div>
  );
}
