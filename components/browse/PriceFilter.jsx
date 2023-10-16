import React, { useState } from "react";

export default function PriceFilter({ priceHandler }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinPriceChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setMinPrice(input);
      priceHandler(input, "min");
    }
  };

  const handleMaxPriceChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setMaxPrice(input);
      priceHandler(input, "max");
    }
  };

  const clearInputs = () => {
    setMinPrice("");
    setMaxPrice("");
    priceHandler("", "min");
    priceHandler("", "max");
  };

  return (
    <div className="ml-5 flex flex-col gap-2 mt-3 p-1">
      <h1 className=" font-bold ml-2">Batas Harga</h1>
      <div className="flex flex-row gap-3">
        <input
          type="text"
          value={minPrice}
          className="border border-gray-300 p-2 rounded w-16 h-8"
          placeholder="min"
          onChange={handleMinPriceChange}
        />
        <div className=" mt-4 border-gray-500 border-t w-12 flex justify-center"></div> {/* Tanda "-" sebagai rentang lebih panjang */}
        <input
          type="text"
          value={maxPrice}
          className="border border-gray-300 p-2 rounded w-16 h-8"
          placeholder="max"
          onChange={handleMaxPriceChange}
        />
        
      </div>
      <button
          className="bg-red-500 text-white p-1 rounded"
          onClick={clearInputs}
        >
          <h1 className="text-sm">

          Clear
          </h1>
        </button>
    </div>
  );
}
