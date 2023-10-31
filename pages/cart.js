import HeaderMenu from "@/components/header";
import TempatPesanan from "@/components/pesanan";
import CartHeader from "@/components/pesanan/CartHeader";
import TotalOrder from "@/components/pesanan/TotalOrder";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCart } from "../requests/user.js";

export default function cart() {
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => ({ ...state }));
  const { data: session } = useSession();
  const Router = useRouter();
  console.log("selected", selected);
  console.log("session", session);
  // const Router = useRouter();
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [ongkir, setOngkir] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOngkir(selected.reduce((a, b) => a + Number(b.shipping), 0).toFixed(0));
    setSubTotal(selected.reduce((a, b) => a + b.price * b.qty, 0).toFixed(0));
    setTotal(
      selected
        .reduce((a, c) => a + c.price * c.qty + Number(c.shipping), 0)
        .toFixed(0)
    );
  }, [selected]);

  const saveCartToDb = async () => {
    if (session) {
      setLoading(true); // Atur loading menjadi true saat memulai proses penyimpanan
      const res = saveCart(selected);
      if (res) {
        // Menambahkan jeda selama 2 detik sebelum mengarahkan pengguna ke Checkout
        setTimeout(() => {
          setLoading(false); // Setelah jeda, atur loading menjadi false
          Router.push("/checkout");
        }, 2000);
      }
    } else {
      signIn();
    }
  };

  return (
    <div className=" bg-gray-200">
      <Head>
        <title>Cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <HeaderMenu />
      </div>
      {cart.cartItems.length === 0 ? (
        <div className="text-center bg-white ">
          <div className="flex justify-center p-7">
            <img src="../../../assets/Empty.png" className=" h-56 w-56" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Keranjang Belanja Anda Kosong
            </h1>
          </div>
          <div>
            <p className="text-lg font-semibold">
              Silahkan pilih produk yang ingin dibeli
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              href="/browse"
              className="bg-red-500 text-white font-semibold rounded-md px-5 py-2 mt-5"
            >
              Belanja Sekarang
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div className=" mt-6 mb-3 ml-9">
            <div className=" mb-5 ">
              <CartHeader
                cartItems={cart.cartItems}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <div className=" bg-white">
              <div className="text-2xl font-bold p-2 flex gap-1">
                Keranjang Belanja
              </div>
              {cart.cartItems.map((item) => (
                <TempatPesanan
                  key={item._uid}
                  pesanan={item}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
          </div>
          <div className=" pr-5 mt-6 rounded-sm">
            <TotalOrder
              subTotal={subTotal}
              total={total}
              selected={selected}
              ongkir={ongkir}
              saveCartToDb={saveCartToDb}
            />
          </div>
        </div>
      )}
      {loading && <div className="text-center mt-4">Sedang memproses...</div>}
    </div>
  );
}
