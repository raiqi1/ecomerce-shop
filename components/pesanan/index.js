import { updateCart } from "@/store/cartSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { RiCheckLine, RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function TempatPesanan({ pesanan, selected, setSelected }) {
  const imagesCart = pesanan.images[0].url;
  const [active, setActive] = useState();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const check = selected.find((p) => p._uid == pesanan._uid);
    setActive(check);
  }, [selected]);

  const updateQty = (item) => {
    let newQty = cart.cartItems.map((q) => {
      if (q._uid === pesanan._uid) {
        return {
          ...q,
          qty: item === "plus" ? pesanan.qty + 1 : pesanan.qty - 1,
        };
      }
      return q;
    });
    dispatch(updateCart(newQty));
  };

  const removeCart = () => {
    let newCart = cart.cartItems.filter((remove) => {
      return remove._uid !== pesanan._uid;
    });
    dispatch(updateCart(newCart));
  };

  const handleSelect = () => {
    if (active) {
      setSelected(selected.filter((item) => item._uid !== pesanan._uid));
    } else {
      setSelected([...selected, pesanan]);
    }
  };

  return (
    <div className="px-10 w-[800px] mt-3">
      <div className="flex divide-y divide-gray-200 divide-solid ">
        <div
          onClick={() => handleSelect()}
          className={`border border-solid mt-2 border-gray-700 h-5 w-7 rounded-full ${
            active ? " bg-gray-600" : ""
          }`}
        ></div>
        {/* <img src="../../../assets/selected.png" alt="" /> */}
        <div className="p-5">
          <img
            src={imagesCart}
            alt={pesanan.name}
            className=" h-40 w-40 rounded"
          />
        </div>
        <div className=" pt-5 w-full">
          <h1 className="text-sm">{pesanan.name.substring(0, 40)}...</h1>
          <Link href={`/product/${pesanan.slug}?style=${pesanan.style}`}>
            <div className="flex bg-blue-gray-50 cursor-pointer hover:bg-gray-300 rounded w-56 gap-5">
              <img
                src={pesanan?.color?.image}
                alt=""
                className=" h-10 w-10 rounded-full"
              />
              <div className="flex flex-col justify-center">
                <h1 className="text-center text-sm font-bold">
                  Rp.{pesanan.price.toFixed(0)},000,00
                </h1>
              </div>
              <span className="flex flex-col justify-center">
                <IoIosArrowForward />
              </span>
            </div>
          </Link>
          <div className="p-2 flex gap-5">
            <h1 className=" font-bold">Rp.{pesanan.price.toFixed(0)},000,00</h1>{" "}
            dari
            <p className=" line-through text-gray-400">
              Rp.{pesanan.priceBefore},000,00
            </p>
          </div>
        </div>
        <div className=" space-y-8 pt-2">
          <div className="flex gap-3 cursor-pointer">
            <button
              disabled={active || pesanan.qty === 1}
              className="h-7 w-7 rounded-full bg-gray-100"
              onClick={() => updateQty("minus")}
            >
              -
            </button>
            <span className="text-sm mt-1">{pesanan.qty}</span>
            <button
              disabled={active || pesanan.qty === pesanan.quantity}
              className="h-7 w-7 rounded-full bg-gray-100"
              onClick={() => updateQty("plus")}
            >
              +
            </button>
          </div>
          <div className="flex justify-end cursor-pointer">
            <RiDeleteBin2Fill
              size="25px"
              className=" hover:fill-red-600 cursor-pointer"
              onClick={() => removeCart()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
