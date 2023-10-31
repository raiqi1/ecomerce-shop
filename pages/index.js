import CarouselDefault from "@/components/Carousel";
import CategoryAdded from "@/components/Carousel/CategoryAdded";
import AllProduct from "@/components/allproducts";
import CategoryShop from "@/components/category";
import HeaderMenu from "@/components/header";
import Product from "@/model/Product";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";
import db from "@/utils/db";

export default function home({ products }) {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <>
      <Head>
        <title>HomePage</title>
      </Head>
      {/* {session ? (
        <div>
          <h1>{session?.user?.name}</h1>
          <span>{session?.user?.email}</span>
        </div>
      ) : (
        "you are not login"
      )} */}
      <div>
        <div>
          <HeaderMenu />
        </div>
        <div></div>
        <div className="">
          <CategoryAdded />
        </div>
        <div>
          <CategoryShop />
        </div>
        <div className="grid grid-cols-6 gap-1 px-10 bg-gray-200">
          {products.map((p) => (
            <div className="">
              <AllProduct product={p} />
            </div>
          ))}
        </div>
        <Link href="/browse">
          <div className="flex justify-center bg-gray-200 p-10 ">
            <div className=" rounded-md w-40  text-sm bg-green-600 flex justify-center p-1 gap-3">
              <h1>Lebih Banyak</h1>
              <div className=" flex flex-col justify-center">
                <AiOutlineArrowRight />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  db.connectDb();

  const pageSize = 6;

  let products = await Product.find()
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .lean();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
