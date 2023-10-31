import { compareArrays } from "@/utils/arrays_utils";
import React, { useEffect, useState } from "react";

export default function CartHeader({ cartItems, selected, setSelected }) {
  const [active, setActive] = useState();

  useEffect(() => {
    const check = compareArrays(selected, cartItems);
    setActive(check);
  }, [selected, cartItems]);

  const handleSelectAll = () => {
    if (selected.length !== cartItems.length) {
      setSelected(cartItems);
    } else {
      setSelected([]);
    }
  };

  return (
    <div className="flex gap-2 bg-white p-5 ">
      <div
        className={`  border border-black w-5 h-5 rounded-full ${
          active ? "bg-gray-800" : ""
        }`}
        onClick={() => handleSelectAll()}
      ></div>
      <h2>Pilih Semua</h2>
      <h1>({cartItems.length} Items)</h1>
    </div>
  );
}
