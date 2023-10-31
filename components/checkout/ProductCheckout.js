import React from "react";

export default function ProductCheckout({ cart }) {
  return (
    <div className="  w-[500px] ml-5 outline-gray-400 outline mt-9 outline-1">
      <div className="">
        <h1>Cart</h1>
        <span>
          {cart.products.length === 1
            ? "1 items"
            : `${cart.products.length} items`}
        </span>
      </div>
      <div className=" grid grid-cols-3">
        {cart.products.map((product, index) => (
          <div className="" key={index}>
            <div className="">
              <img src={product.image} className=" h-32 w-32" alt={product.name} />
              <div className="flex gap-3 p-1">
                <img src={product.color.image} className=" h-7 w-7 rounded-full" alt="" />
                <span>{product.size}</span>
                <span>x{product.qty}</span>
              </div>
            </div>
            <div className="">
              {product.name.length > 18
                ? product.name.slice(0, 18) + "..."
                : product.name}
            </div>
            <div className="">
              <span>${(product.price * product.qty).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="">
        SubTotal : <b>{cart.cartTotal}$</b>
      </div>
    </div>
  );
}
