import React from "react";
import { GoDotFill } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { MdAddLocationAlt } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";

export default function Footer() {
  const images = [
    {
      img: "/footer1.webp",
    },
    {
      img: "/footer2.webp",
    },
    {
      img: "/footer3.webp",
    },
    {
      img: "/footer4.webp",
    },
    {
      img: "/footer5.webp",
    },
    {
      img: "/footer6.webp",
    },
  ];
  const gallery = [
    {
      img: "/g1.jpg",
    },
    {
      img: "/g2.jpg",
    },
    {
      img: "/g3.jpg",
    },
    {
      img: "/g4.jpg",
    },
    {
      img: "/g5.jpg",
      className: "lg:hidden xl:block",
    },
    {
      img: "/g6.jpg",
      className: "lg:hidden xl:block",
    },
  ];
  const links = [
    {
      title: "About",
      // link: "/about",
    },
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
  const socialLinks = [
    {
      icon: <FaFacebookF />,
    },
    {
      icon: <FaXTwitter />,
    },
    {
      icon: <FaInstagram />,
    },
    {
      icon: <FaPinterestP />,
    },
  ];

  return (
    <section className="relative">
      <div>        
        <aside className="bg-[#1E1E1E] py-20 mt-14 text-white grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 main-container">
        <div className="flex flex-col gap-12 text-white">
          <div className="flex flex-col gap-2">
            <h1 className="font-[sedan] text-2xl ">CONTACT INFO</h1>
            <p className="border-b border-2 w-12 border-[#BB5323]"></p>
          </div>
          <div className="flex flex-col text-white gap-8 opacity-70 text-lg">
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#BB5323]" /> +91 9124570583
            </p>
            <p className="flex items-start gap-3">
              <MdAddLocationAlt className="pt-1 h-8 w-8 text-[#BB5323]" />
              Station Square, Talcher, Angul Pin 759100
            </p>
          </div>
          <div className="flex gap-10">
            {socialLinks?.map((item) => (
              <div className="text-2xl bg-[#BB5323] rounded-full p-2">
                {item?.icon}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <h1 className="font-[sedan] text-2xl ">USEFUL LINKS</h1>
            <p className="border-b border-2 w-12 border-[#BB5323]"></p>
          </div>
          <div className="flex flex-col text-white gap-5 opacity-70 text-lg">
            {links?.map((item) => (
              <a>
                <div className="font-[sedan] flex items-center gap-2 cursor-pointer hover:text-[#BB5323]">
                  <GoDotFill className="text-[#BB5323] h-4 w-4" />
                  {item?.title}
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="font-[sedan] text-2xl ">NEWSLETTER</h1>
            <p className="border-b border-2 w-12 border-[#BB5323]"></p>
          </div>
          <div className="flex flex-col gap-5">
            <p>Subscribe Our Newsletter</p>
            <form
              action="
          "
            >
              <input
                type="email"
                placeholder="Enter Your Email ....."
                className="py-4 w-full px-4"
              />
            </form>
            <button className="bg-[#BB5323] py-4 w-full">
              SUBSCRIBE NOW
            </button>
          </div>
        </div>
        </aside>
        <aside className="bg-[#161616] h-20  flex items-center justify-center main-container">
          <h1 className="text-white opacity-70">
            © 2024. Mail Login
          </h1>
        </aside>
      </div>
    </section>
  );
}
