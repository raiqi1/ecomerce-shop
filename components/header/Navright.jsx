import React, { useState } from "react";
import { BiSolidNotification } from "react-icons/bi";
import { FiHelpCircle } from "react-icons/fi";
import { TfiWorld } from "react-icons/tfi";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navright = () => {
  return (
    <>
      <div className="flex gap-3 mt-3">
        <div className="md:cursor-pointer group z-10 ">
          <h1 className=" flex text-sm  md:pr-0 pr-5 group text-white">
            <div className=" flex gap-1 ">
              <span className=" flex flex-col justify-center">
                <BiSolidNotification className=" text-xl " />
              </span>
              <h1 className=" flex flex-col justify-center align-middle">
                Notifikasi
              </h1>
            </div>
          </h1>
          <div className="absolute  hidden group-hover:md:block hover:md:block flex-row-reverse">
            <div className="py-2 absolute ml-4 bg-white w-4 h-5 rotate-45 "></div>
            <div className=" bg-white rounded-sm w-40 absolute mt-2 ">
              <div className=" w-full flex flex-row place-content-center mt-20 ">
                <img
                  className=" h-20 w-20 "
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/99e561e3944805a023e87a81d4869600.png"
                  alt=""
                />
              </div>
              <div className=" grid grid-cols-2 text-center bg-slate-400 w-40 place-content-center self-center align-middle h-full mt-20 rounded-lg ">
                <h1 className=" hover:bg-blue-gray-300 h-[30px] rounded-sm">Daftar</h1>
                <h1 className=" hover:bg-blue-gray-300 h-[30px] rounded-sm">Login</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex  text-white gap-1">
          <span>
            <FiHelpCircle className=" text-lg" />
          </span>
          <h1 className=" text-sm">Bantuan</h1>
        </div>
        <div className="md:cursor-pointer group ">
          <h1 className=" flex text-sm  md:pr-0 pr-5 group text-white">
            <div className=" flex text-center align-middle justify-center gap-1">
              <span className=" flex flex-col justify-center">
                <TfiWorld className="" />
              </span>
              <div className=" flex ">
                <h1 className=" flex flex-col justify-center align-middle">
                  Bahasa Indonesia
                </h1>
                <span className="flex flex-col justify-center">
                  <RiArrowDropDownLine className=" text-xl " />
                </span>
              </div>
            </div>
          </h1>
          <div className="absolute top-7 hidden group-hover:md:block hover:md:block flex-row-reverse">
            <div className="py-2 absolute ml-7 bg-white w-4  h-5 rotate-45 "></div>
            <div className=" bg-white rounded-sm w-40 absolute mt-1 ">
              <div className=" w-full flex flex-col  place-content-center p-4 gap-3">
                <h1 className=" hover:text-orange-600 text-sm">
                  Bahasa Indonesia
                </h1>
                <h1 className=" hover:text-orange-600 text-sm"> English</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 top-5 ml-2">
          <h1 className="text-sm text-white ">Daftar</h1>
          <div className="w-[1px] h-[14px] mt-[3px] bg-slate-200" />
          <h1 className="text-sm  text-white">Login</h1>
        </div>
      </div>
    </>
  );
};

export default Navright;
