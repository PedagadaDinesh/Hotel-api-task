/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BiLogInCircle, BiUser } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";

const MiddleBar = ({ open }: { open: () => void }) => {
  return (
    <aside className="main-container flex items-center justify-between py-1.5 bg-black">
      <div className="lg:w-[26%] md:w-[30rem] w-[35rem] object-contain">
        <Link href="/" className="flex items-center gap-5">
          <img
            src="/logo.webp"
            alt="main-logo"
            className="w-16 md:w-20 lg:w-36 cursor-pointer"
          />
          <div className="text-white">
            <h1 className=" font-[sedan] text:sm md:text-base lg:text-lg 2xl:text-xl">
              HOTEL{" "}
              <span className="text-amber-700 tracking-wider font-[sedan] text:base md:text-2xl 2xl:text-3xl">
                KP PALACE
              </span>
            </h1>
            <p className="sedan-regular-italic 2xl:text-lg">
              A Royal Residence
            </p>
          </div>
        </Link>
      </div>
      <div className="lg:w-[74%] w-[calc(100%-10rem)] flex gap-3 lg:gap-10 items-center justify-end">
        <div
          onClick={open}
          className="h-8 w-8 text-lg cursor-pointer text-white lg:hidden rounded flex items-center justify-center text-primary"
        >
          <RxHamburgerMenu />
        </div>
      </div>
    </aside>
  );
};

export default MiddleBar;
