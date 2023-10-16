import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { links } from "./Mylinks.jsx";

const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <>
      {links.map((link,y) => (
        <div className=" z-10" key={y}>
          <div className="md:cursor-pointer group">
            <h1
              className=" flex text-sm  md:pr-0 pr-5 group text-white"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              <div className=" flex text-center align-middle justify-center">
                <h1 className=" flex flex-col justify-center align-middle">
                  {link.name}
                </h1>
                <div className="w-[1px] ml-3 h-[14px] mt-[3px] bg-slate-200" />
              </div>
              {/* <span className="text-xl md:hidden inline">
                <ion-icon
                  name={`${
                    heading === link.name ? "chevron-up" : "chevron-down"
                  }`}
                ></ion-icon>
              </span> */}
              <span className="text-xl md:mt-1 md:ml-2  md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                <ion-icon name="chevron-down"></ion-icon>
              </span>
            </h1>
            {link.submenu && (
              <div>
                <div className="absolute top-4 hidden group-hover:md:block hover:md:block">
                  <div className="py-2"></div>
                  <div className=" bg-white rounded-md p-3">
                    <img
                      className=" h-40 w-40"
                      src="https://th.bing.com/th/id/R.961982df97032301a8bfe696badc6d6e?rik=%2bYnxzIdytrfiyQ&riu=http%3a%2f%2fwww.v3b.com%2fwp-content%2fuploads%2f2011%2f11%2fQR_Code.jpg&ehk=paVhkmoSWz1ksd2aNd1NM0wGBA93eLAV0dZ4xGpYSJI%3d&risl=&pid=ImgRaw&r=0"
                      alt=""
                    />
                    <div className=" grid grid-cols-2 mt-1">
                      <div className=" flex gap-[2px]">
                        <div className="flex flex-col self-center">
                          <img
                            className=" h-4 w-4 "
                            src="https://th.bing.com/th/id/OIP.ALE4egYy5uWIDoXhehJk2QAAAA?pid=ImgDet&w=400&h=400&rs=1"
                            alt=""
                          />
                        </div>
                        <h1 className=" text-[12px]">App Store</h1>
                      </div>
                      <div className=" flex gap-[2px]">
                        <div className="flex flex-col self-center">
                          <img
                            className=" h-4 w-4 "
                            src="https://1.bp.blogspot.com/-LYogZdOD6BE/XqxJX1r72dI/AAAAAAAABJ8/7Vn-oxOchvsrOSd96p9inL4iOLtgJu2TACLcBGAsYHQ/s1600/1a49226d155846acb790eeb919f63c8e.jpg"
                            alt=""
                          />
                        </div>
                        <h1 className=" text-[12px]">Google Play</h1>
                      </div>
                    </div>
                    <div className=" flex gap-[2px] mt-1">
                      <div className="flex flex-col self-center">
                        <img
                          className=" h-4 w-4 "
                          src="https://styles.redditmedia.com/t5_325xg6/styles/communityIcon_795wmj3knyk51.png?width=256&s=d763ac9e2e0d7773492bc271a7d5d7dfcc72e662"
                          alt=""
                        />
                      </div>
                      <h1 className=" text-[12px]">AppGallery</h1>
                    </div>
                  </div>

                  {/* <div className="bg-white p-5 grid grid-cols-3 gap-10">
                    {link.sublinks.map((mysublinks) => (
                      <div>
                        <h1 className="text-lg font-semibold">
                          {mysublinks.Head}
                        </h1>
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}
            {link.sublinks.map((slinks, i) => (
              <div key={i}>
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== slinks.Head
                        ? setSubHeading(slinks.Head)
                        : setSubHeading("")
                    }
                    className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center md:pr-0 pr-5"
                  >
                    {slinks.Head}

                    <span className="text-xl md:mt-1 md:ml-2 inline">
                      <ion-icon
                        name={`${
                          subHeading === slinks.Head
                            ? "chevron-up"
                            : "chevron-down"
                        }`}
                      ></ion-icon>
                    </span>
                  </h1>
                  <div
                    className={`${
                      subHeading === slinks.Head ? "md:hidden" : "hidden"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        <img src="" alt="" />
      </div>
    </>
  );
};

export default NavLinks;
