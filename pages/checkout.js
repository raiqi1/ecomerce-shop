import Cart from "@/model/Cart";
import User from "@/model/User";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ProductCheckout from "@/components/checkout/ProductCheckout";
import db from "@/utils/db";

export default function checkout({ cart, user }) {
  // const [cartData, setCartData] = useState(cart);
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div>
        <ProductCheckout cart={cart} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  db.connectDb()
  const session = await getSession(context);
  const user = await User.findById(session.user.id);
  const cart = await Cart.findOne({ user: user._id });
  db.disconnectDb();
  if (!cart) {
    return {
      redirect: {
        destination: "/cart",
      },
    };
  }
  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
