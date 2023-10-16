import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import FilterReview from "./FilterReview";

export default function ProductDetails({ product, activeImage, setActiveImg }) {
  const router = useRouter();
  const imgProd = product.images.map((p) => {
    return p;
  });
  console.log("imgProd", imgProd);
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(router.query.size);
  const [qty, setQty] = useState(1);

  const imgColor = product.colors;
  console.log("imgColor", imgColor);

  useEffect(() => {
    setSize("");
  }, [router.query.style]);

  return (
    <div className=" ">
      <div className=" mt-6 rounded p-3 bg-white grid grid-cols-3 gap-[300px] w-[1200px]">
        <div className=" w-[800px]">
          <div className=" w-[600px]">
            <img
              className="  h-[400px] w-[450px]"
              src={`${activeImage || imgProd[active]?.url}`}
              alt=""
            />
          </div>
          <div className="flex gap-2 mt-1">
            {imgProd.map((p, i) => (
              <div>
                <img
                  className={`${"h-14 w-[68.3px] hover:outline outline-red-400 "}${
                    i == active && "hover:outline outline-2 outline-lime-700"
                  }`}
                  src={p?.url}
                  alt=""
                  key={i}
                  onMouseOver={() => setActive(i)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className=" col-span-2">
          <div>
            <h2>{product.description}</h2>
          </div>
          <div className="flex p-2 gap-4 divide-x divide-gray-400">
            <div className=" flex">
              <h1 className="underline underline-offset-4 text-base text-orange-900">
                {product.rating}
              </h1>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
                className=" text-lg"
              />
            </div>
            <div className=" px-4 flex gap-1 ">
              <span className=" text-base underline underline-offset-4">
                {product.reviews.length}
              </span>
              <h1 className=" text-sm flex flex-col justify-center text-gray-400">
                Penilaian
              </h1>
            </div>
          </div>
          <div className="">
            <div className=" flex gap-3">
              <h1 className=" flex flex-col justify-center">
                {!size ? (
                  <h1 className="text-gray-500 text-sm line-through ">
                    Rp.{product.rangeHargaSebelumnya}
                  </h1>
                ) : (
                  <h1 className="line-through text-sm text-gray-500">
                    Rp.{product.price}
                  </h1>
                )}
              </h1>
              <h1>
                {!size ? (
                  <h1 className="text-3xl font-bold text-orange-800">
                    Rp.{product.rangeHargaDisc}
                  </h1>
                ) : (
                  <h1 className="text-3xl font-bold text-orange-800">
                    Rp.{product.hargaDiscount}
                  </h1>
                )}
              </h1>
              <span className=" flex flex-col justify-center">
                <h1 className=" bg-red-500 px-1 text-xs text-white rounded-sm font-bold">
                  {product.discount}% off
                </h1>
              </span>
            </div>
            <div className="flex gap-8">
              <h1 className=" flex flex-col text-center justify-center">
                Pengiriman
              </h1>
              <div className="">
                <img
                  src="../../assets/ongkir.png"
                  alt=""
                  className="h-10 w-10"
                />
              </div>
            </div>
            <div className=" flex gap-3 py-6">
              <div className=" mr-10">
                <h1>Warna</h1>
              </div>
              {product.colors.map((p, i) => (
                <div
                  className={`${"rounded-sm"} ${
                    i == router.query.style
                      ? " flex outline outline-red-300"
                      : ""
                  }`}
                  key={i}
                >
                  <Link
                    className=" flex"
                    href={`/product/${product.slug}?style=${i}`}
                    scroll={false}
                  >
                    <div className="flex p-1 bg-gray-200">
                      <img src={p?.image} alt="" className="h-6 rounded-md" />
                      <h1 className="text-sm items-center flex">
                        {p?.color}
                        {/* {p?.color == "Black" ? "Hitam" : "Putih"}  */}
                      </h1>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex mt-3 gap-2 ">
            <div className=" mr-10">
              <h1>Ukuran</h1>
            </div>
            {product.sizes.map((s, i) => (
              <div className=" p-1 bg-gray-200 rounded-md" key={i}>
                <Link
                  href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
                  scroll={false}
                  className=""
                >
                  <div
                    className={`${
                      i == router.query.size &&
                      " rounded outline outline-lime-500"
                    }`}
                    onClick={() => setSize(s.size)}
                  >
                    <h1 className=" text-center">{s.size}</h1>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="py-12 flex gap-10">
            <h1>Kuantitas</h1>
            <div className=" w-full cursor-pointer ">
              <button
                className={`${qty === 1 && "cursor-not-allowed"}`}
                onClick={() => setQty((min) => min - 1)}
                disabled={qty === 1}
              >
                <h1 className=" border border-solid text-lg text-gray-500 w-8">
                  -
                </h1>
              </button>
              {/* <input
              type="text"
              className=" w-10 text-center"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            /> */}
              <span className=" px-4">{qty}</span>
              <button
                className=" "
                onClick={() => setQty((plus) => plus + 1)}
                disabled={qty === product.stock}
              >
                <h1 className=" border border-solid text-lg text-gray-500 w-8">
                  +
                </h1>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-3 bg-white">
        <FilterReview reviews={product.reviews} />
      </div>
    </div>
  );
}
