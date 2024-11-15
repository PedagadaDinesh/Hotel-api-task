import React, { useState } from "react";
import MiddleBar from "@/components/MiddleBar";
import ResponsiveDrawer from "./ResponsiveDrawer";
import useScrollPosition from "@/hooks/useScrollPosition";

export default function Navbar() {
  const scrollPosition = useScrollPosition();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selected, isSelected] = useState<string | null>(null);
  const navbar = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      // link: "/about",
    },
    {
      title: "Hotels",
      // link: "/hotel",
    },
    {
      title: "Events",
      // link: "/gallery",
    },
    {
      title: "Contact",
      // link: "/contact",
    },
  ];

  return (
    <nav
      className={`sticky top-0 z-[9000] transition-all duration-100 ease-in-out bg-[#1E1E1E] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]`}
    >
      <div className="lg:hidden block">
        <MiddleBar open={() => setOpenDrawer(true)} />
      </div>
      <div className="main-container py-5 lg:flex hidden justify-between items-center bg-black ">
        <aside className="flex items-center gap-5">
          {/* <a href="/">
            <img src="/logo.webp" alt="logo cursor-pointer" />
          </a> */}
          <div className="text-white">
            <h1 className=" font-[sedan] text-lg 2xl:text-xl">
              HOTEL{" "}
              <span className="text-amber-700 tracking-wider font-[sedan] text-2xl 2xl:text-3xl">
               Bookingo...
              </span>
            </h1>
           
          </div>
        </aside>
        <aside className="flex text-white gap-8 font-medium uppercase text-sm 2xl:text-lg">
          {navbar?.map((item) => (
            <a href={item?.link}>
              <div
                className={`font-[sedan] hover:border-b cursor-pointer common-transition`}
              >
                {item?.title}
              </div>
            </a>
          ))}
        </aside>
        <aside className="flex flex-col gap-1">
          <a
            // href="/selectRoom"
            className="relative inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-[#1E1E1E] group border border-white"
          >
            <span className="absolute w-0 h-0 transition-all 2xl:text-lg duration-700 ease-out bg-[#BB5323] rounded-xl group-hover:w-56 group-hover:h-56"></span>
            <span className="relative font-[sedan]">LOGIN</span>
          </a>
          <p className="border-b w-16"></p>
        </aside>
        
      </div>
      <div className="lg:hidden block">
        <ResponsiveDrawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        />
      </div>
    </nav>
  );
}
