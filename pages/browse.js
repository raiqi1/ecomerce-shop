import AllProduct from "@/components/allproducts";
import BrandFilter from "@/components/browse/BrandFilter";
import PriceFilter from "@/components/browse/PriceFilter";
import SortProducts from "@/components/browse/SortProducts";
import CategoryFilter from "@/components/browse/categoryFilter";
import RatingFilter from "@/components/browse/ratingFilter";
import HeaderMenu from "@/components/header";
import Category from "@/model/Category";
import Product from "@/model/Product";
import db from "@/utils/db";
import { Pagination } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function browse({ categories, products, hitungPage }) {
  console.log("products", products);
  console.log("categories", categories);
  console.log("hitungPage", hitungPage);

  const router = useRouter();
  const filter = ({ category, rating, brand, price, sort, page }) => {
    const path = router.pathname;
    console.log("path", path);
    const { query } = router;
    console.log("query", query);
    if (category) query.category = category;
    if (rating) query.rating = rating;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (sort) query.sort = sort;
    if (page) query.page = page;
    router.push(
      {
        pathname: path,
        query: query,
      },
      undefined,
      { scroll: false }
    );
  };

  const priceHandler = (price, type) => {
    let priceQuery = router.query.price?.split("_") || "";
    let min = priceQuery[0] || "";
    let max = priceQuery[1] || "";
    let hargBaru = "";
    if (type == "min") {
      hargBaru = `${price}_${max}`;
    } else {
      hargBaru = `${min}_${price}`;
    }
    filter({ price: hargBaru });
  };

  const multiPriceHandler = (min, max) => {
    filter({ price: `${min}_${max}` });
  };

  const categoryHandler = (category) => {
    filter({ category });
  };
  const ratingHandler = (rating) => {
    filter({ rating });
  };
  const brandHandler = (brand) => {
    filter({ brand });
  };

  const sortHandler = (sort) => {
    if (sort == "") {
      filter({ sort: {} });
    } else {
      filter({ sort });
    }
  };

  const pageHandler = (e,page) => {
    filter({ page });
  };

  function replaceQuery(queryName, value) {
    const adaQuery = router.query[queryName];
    const queryCheck = adaQuery?.search(value);
    const _check = adaQuery?.search(`_${value}`);
    let result = "";
    if (adaQuery) {
      if (adaQuery === value) {
        result = {};
      } else {
        if (queryCheck !== -1) {
          if (_check !== -1) {
            result = adaQuery?.replace(`_${value}`, "");
          } else if (queryCheck == 0) {
            result = adaQuery?.replace(`${value}_`, "");
          } else {
            result = adaQuery?.replace(value, "");
          }
        } else {
          result = `${adaQuery}_${value}`;
        }
      }
    } else {
      result = value;
    }
    return {
      result,
      active: adaQuery && queryCheck !== -1 ? true : false,
    };
  }

  return (
    <div>
      <Head>
        <title>Browse</title>
      </Head>
      <div>
        <HeaderMenu />
      </div>

      <div className="flex gap-6 ">
        <div className=" gap-24 divide-y ml-5 space-y-3 divide-solid divide-gray-300">
          <div className="flex flex-col justify-center mt-2">
            <h1 className=" text-sm text-gray-500">Home / Browse</h1>
          </div>
          <div className="flex gap-3  ">
            <CategoryFilter
              categories={categories}
              replaceQuery={replaceQuery}
              categoryHandler={categoryHandler}
            />
          </div>
          <div>
            <RatingFilter
              ratingHandler={ratingHandler}
              replaceQuery={replaceQuery}
            />
          </div>
          <div onScroll={false}>
            <PriceFilter priceHandler={priceHandler} />
          </div>
          <div>
            <BrandFilter
              brandHandler={brandHandler}
              replaceQuery={replaceQuery}
            />
          </div>
          <div className="mt-5 flex justify-center py-5">
            <button
              onClick={() => {
                router.push("/browse", undefined, { scroll: false });
              }}
              className=" bg-blue-gray-500 rounded ml-3 text-sm  p-1 w-full"
            >
              <h1 className=" text-white">Hapus Semua</h1>
            </button>
          </div>
        </div>
        <div className=" w-[1000px]">
          <div>
            <SortProducts sortHandler={sortHandler} />
          </div>
          <div className="flex gap-3 mt-5" onScroll={false}>
            {products.map((product) => (
              <AllProduct product={product} key={product._id} />
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <Pagination
              defaultPage={Number(router.query.page) || 1}
              count={hitungPage}
              onChange={pageHandler}
              variant="outlined"
              shape="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;

  function createRegex(data, styleRegex) {
    if (data.length > 1) {
      for (var i = 1; i < data.length; i++) {
        styleRegex += `|^${data[i]}`;
      }
    }
    return styleRegex;
  }

  const categoryQuery = query.category || "";
  const ratingQuery = query.rating || "";
  const priceQuery = query.price?.split("_") || "";
  const sortQuery = query.sort || "";
  const pageSize = 1;
  const page = query.page || 1;

  /*   untuk filter brand atau merk  */
  const brandQuery = query.brand?.split("_") || "";
  const brandRegex = `^${brandQuery[0]}`;
  const brandSearchRegex = createRegex(brandQuery, brandRegex);

  // const category = categoryQuery ? {category: categoryQuery} : {};
  const category =
    categoryQuery && categoryQuery !== "" ? { category: categoryQuery } : {};

  const rating =
    ratingQuery && ratingQuery !== ""
      ? {
          rating: {
            $gte: Number(ratingQuery),
          },
        }
      : {};

  const brand =
    brandQuery && brandQuery !== ""
      ? { brand: { $regex: brandSearchRegex } }
      : {};

  const price =
    priceQuery && priceQuery !== ""
      ? {
          "subProducts.sizes.price": {
            $gte: Number(priceQuery[0]) || 0,
            $lte: Number(priceQuery[1]) || Infinity,
          },
        }
      : {};

  const sort =
    sortQuery == ""
      ? {}
      : sortQuery == "popular"
      ? { rating: -1, "subProducts.sold": -1 }
      : sortQuery == "newest"
      ? { createdAt: -1 }
      : sortQuery == "topSelling"
      ? { "subProducts.sold": -1 }
      : sortQuery == "topReview"
      ? { rating: -1 }
      : sortQuery == "priceHighToLow"
      ? { "subProducts.sizes.price": -1 }
      : sortQuery == "priceLowToHigh"
      ? { "subProducts.sizes.price": 1 }
      : {};

  db.connectDb();
  let productDb = await Product.find({
    ...category,
    ...rating,
    ...brand,
    ...price,
  })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .sort(sort)
    .lean();

  let products =
    sortQuery && sortQuery !== ""
      ? productDb
      : productDb.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });

  let categories = await Category.find({}).lean();

  let count = await Product.countDocuments({
    ...category,
    ...rating,
    ...brand,
    ...price,
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
      hitungPage: Math.ceil(count / pageSize),
    },
  };
}
