import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Logo from "../../assets/Logo.png";
import Button from "../header/Button";
import NavLinks from "./NavLinks.jsx";
import { MdNotificationsNone } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { GiWorld } from "react-icons/gi";
import Navright from "./Navright";
import { BsSearch } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className=" bg-orange-500 w-full h-32">
      <div className="font-medium flex">
        <ul className="md:flex hidden items-center gap-1 ml-20 mt-2">
          <li className="flex">
            <NavLinks />
          </li>
          <h1 className=" text-white">ikuti kami di</h1>
          <li className=" text-white flex gap-2 justify-center text-center align-middle cursor-pointer">
            <img
              className="rounded-full flex-col self-center bg-transparent h-4 w-4"
              src="https://th.bing.com/th/id/OIP.igAQfPvLCLVT1J67566j1QHaHa?pid=ImgDet&w=1536&h=1536&rs=1"
              alt=""
            />
            <img
              className=" rounded-[5px] flex-col self-center bg-transparent h-4 w-4"
              src="https://th.bing.com/th/id/OIP.0wjhvLpjGf_-r-1lqG3QAQHaHw?pid=ImgDet&rs=1"
              alt=""
            />
            <img
              className=" rounded-full flex-col self-center bg-transparent h-4 w-4"
              src="https://cf.shopee.co.id/file/01621edb1c1b1e456d2aacbe18508033"
              alt=""
            />
          </li>
        </ul>
        <ul className="ml-72">
          <li className="">
            <Navright />
          </li>
        </ul>

        {/* Mobile nav */}
        {/* <ul
          className={`
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
          <li>
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks />
          <div className="py-5">
            <Button />
          </div>
        </ul> */}
        {/* <div className="flex">
          <div className="flex mr-3">
            <div className="flex-col self-center mr-[2px]">
              <MdNotificationsNone className="text-white text-xl " />
            </div>
            <div className=" flex-col self-center">
              <h1 className=" text-white text-sm">Notifikasi</h1>
            </div>
          </div>
          <div className="flex mr-3">
            <div className="flex-col self-center mr-[2px]">
              <BiHelpCircle className="text-white text-xl " />
            </div>
            <div className=" flex-col self-center">
              <h1 className=" text-white text-sm">Bantuan</h1>
            </div>
          </div>
          <div className="flex mr-3">
            <div className="flex-col self-center mr-[2px]">
              <GiWorld className="text-white text-xl " />
            </div>
            <div className=" flex-col self-center">
              <h1 className=" text-white text-sm">Bahasa Indonesia</h1>
            </div>
          </div>
          <div className="flex mr-3">
            <div className="flex-col self-center mr-[2px]">
              <MdNotificationsNone className="text-white text-xl " />
            </div>
            <div className=" flex-col self-center">
              <h1 className=" text-white text-sm">Notifikasi</h1>
            </div>
          </div>
          <div className="flex mr-20">
            <div className="flex-col self-center mr-[2px]">
              <MdNotificationsNone className="text-white text-xl " />
            </div>
            <div className=" flex-col self-center">
              <h1 className=" text-white text-sm">Notifikasi</h1>
            </div>
          </div>
        </div> */}
      </div>
      <div className=" bg-transparent px-10 flex">
        <div>
          <button>
            <Link className=" cursor-pointer" href="/browse">
              Browse
            </Link>
          </button>
        </div>
        <Link href="/">
          <img
            src="../../assets/shopee.png"
            alt=""
            className=" ml-10 w-36 rounded"
          />
        </Link>
        <div className=" h-10 mt-6 ml-10 flex bg-white w-[65%] rounded-lg ">
          <input
            type="text"
            className=" p-3 rounded-sm w-full h-10"
            placeholder="Cari produk......"
          />
          <div className="w-30 h-10 bg-white flex justify-end p-1 rounded-sm">
            <div className=" bg-orange-500 w-14 h-8 rounded-sm">
              <BsSearch className=" mt-2 ml-5 text-white" />
            </div>
          </div>
        </div>
        <div className="md:cursor-pointer group flex flex-col justify-center ml-10 z-20">
          <Link href="/cart">
            <span>
              <LuShoppingCart className=" text-2xl text-white" />
            </span>
          </Link>
          <div className="  absolute top-5 mt-20 left-[58%] hidden group-hover:md:block hover:md:block ">
            <div className="py-2 absolute ml-[360px] bg-white w-5 h-2 rotate-45 "></div>
            <div className=" bg-white rounded-sm w-96 h-56 h- absolute mt-1 ">
              <div className=" flex justify-center  place-content-center ">
                <img
                  className=" w-44 h-44"
                  src="https://www.trusthavensolution.com/assets/images/product-not-found.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
