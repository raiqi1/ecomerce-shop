import CarouselDefault from "@/components/Carousel";
import CategoryAdded from "@/components/Carousel/CategoryAdded";
import AllProduct from "@/components/allproducts";
import CategoryShop from "@/components/category";
import HeaderMenu from "@/components/header";
import Product from "@/model/Product";
import db from "@/utils/db";
import Head from "next/head";
import React from "react";

export default function home({ products }) {
  return (
    <>
      <Head>
        <title>HomePage</title>
      </Head>
      <div>
        <div>
          <HeaderMenu />
        </div>
        <div className="">
          <CategoryAdded />
        </div>
        <div>
          <CategoryShop />
        </div>
        <div className=" m-20 flex bg-gray-200">
          {products.map((p) => (
            <AllProduct product={p} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  db.connectDb();

  let products = await Product.find().lean();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
