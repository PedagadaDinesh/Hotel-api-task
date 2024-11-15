/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { useRouter } from "next/router";
import Drawer from "@/components/core/Drawer";

const ResponsiveNavbar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedDropMenu, setSelectedDropMenu] = useState("");
  const [selectedInnerDropMenu, setSelectedInnerDropMenu] = useState("");
  const { push } = useRouter();
  const handleChangeMenus = (title: string, route?: string) => {
    if (route) return push(route);
    setSelectedMenu((prev) => (prev === title ? "" : title));
  };

  const navbar = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      // link: "/about",
    },
    // {
    //   title: "Rooms",
    //   link: "/rooms",
    // },
    {
      title: "Hotels",
      // link: "/holiday",
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
    <Drawer
      open={open}
      onClose={() => onClose()}
      anchor="left"
      drawerStyle="w-[20rem] md:w-[30rem] h-screen"
    >
      <div className="w-full flex flex-col h-full bg-[#1E1E1E]">
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex justify-between items-center w-full py-1.5  px-4 md:px-5 border-b border-primary/30">
            <Link href="/" className="flex items-center gap-5">
              <img
                src="/logo.webp"
                alt="main-logo"
                className="w-16 md:w-20 lg:w-36 cursor-pointer"
              />
              <div className="text-white">
                <h1 className=" font-[sedan] text-sm md:text-base py-3 lg:text-lg 2xl:text-xl">
                  HOTEL{" "}
                  <span className="text-amber-700 tracking-wider font-[sedan] text-base md:text-2xl 2xl:text-3xl">
                   Bookingo...
                  </span>
                </h1>
               
              </div>
            </Link>
            <button
              className="text-lg text-primary text-white"
              onClick={() => onClose()}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="flex flex-col w-full pb-3 px-2 md:px-3 text-white gap-1 md:gap-1.5">
            {navbar.map((_, i) => (
              <div
                key={i}
                className={`w-full flex flex-col ${
                  selectedMenu === _?.title ? "gap-3 md:gap-4" : ""
                }`}
              >
                <div
                  onClick={() => handleChangeMenus(_?.title)}
                  className={`w-full cursor-pointer common-transition px-3 rounded-lg flex py-2 items-center justify-between ${
                    selectedMenu === _?.title
                      ? "bg-primary text-white"
                      : "text-primary"
                  }`}
                >
                  <a href={_?.link}>
                    {" "}
                    <div className="font-[sedan] text-lg md:text-xl">
                      {_?.title}
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ResponsiveNavbar;
