import React from "react";

export default function TotalOrder({
  subTotal,
  total,
  selected,
  ongkir,
  saveCartToDb,
}) {
  // Fungsi untuk mengonversi angka ke format rupiah

  const formatToRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 3,
    }).format(angka);
  };

  const subTotalRupiah = formatToRupiah(subTotal);
  const ongkirRupiah = formatToRupiah(ongkir);
  const totalHarga = formatToRupiah(total);

  return (
    <div className="w-[400px] bg-white divide-y divide-black p-2">
      <div className="">
        <h1 className="text-xl font-bold">Total Order</h1>
        <div className="p-3">
          <div className="justify-between flex">
            <h1 className=" text-sm">Total Pesanan :</h1>
            <span>{subTotalRupiah}</span>
          </div>
          <div className="justify-between flex">
            <h1 className=" text-sm">Ongkos Kirim :</h1>
            <span>{ongkirRupiah}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-5">
        <span className="text-xl font-bold">Total :</span>
        <h1 className="text-xl font-bold">{totalHarga}</h1>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-red-500 text-white font-semibold rounded-md px-5 py-2 mt-5"
          onClick={() => saveCartToDb()}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
