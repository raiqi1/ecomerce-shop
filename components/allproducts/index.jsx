import Link from "next/link";
import React, { useState } from "react";
import { BsBookmarkFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa"; // Menggunakan ikon keranjang belanja sebagai contoh

export default function AllProduct({ product }) {
  console.log("productALL", product);
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [sizes, setSizes] = useState(product.subProducts[active]?.sizes);
  const [discount, setDiscount] = useState(
    product.subProducts[active]?.discount
  );
  // const productAll = product.subProducts.map()
  console.log("images", images);
  const imgO = images[0];
  console.log("imgO", imgO.url);
  const sortImg = images.map((img) => img.url);
  console.log("imgDetails", sortImg);

  const priceO = sizes[0];
  console.log("price0", priceO);
  const style = { height: "200px" };

  return (
    <div className="relative bg-white shadow-md m-3 hover:outline outline-1 outline-black cursor-pointer">
      <Link href={`/product/${product.slug}?style=${active}`}>
        <div className="relative">
          <div className="z-20 absolute flex justify-end w-full text-red-600 font-bold text-xs">
            {discount >= 1 && (
              <h1 className="w-8 flex mt-1 absolute justify-center rounded-full bg-white border border-red-600">
                {discount}%
              </h1>
            )}
          </div>
          <div className="relative group">
            <img
              src={imgO.url}
              alt=""
              className="h-48 w-48 hover:blur-md transition-transform"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
              <FaShoppingCart size={48} color="green" />{" "}
              {/* Ganti dengan gambar keranjang belanja yang sesuai */}
            </div>
          </div>
          <h1 className="text-sm w-36">
            {product.description.substring(0, 40)}...
          </h1>
          <img src="../../../assets/cod2.png" alt="" className="h-[10px] w-8" />
          <div>Rp. {priceO.price}</div>
        </div>
      </Link>
    </div>
  );
}
