import Head from "next/head";
import Navbar from "./Navbar";
import { AiOutlineArrowUp } from "react-icons/ai";
import useScrollPosition from "@/hooks/useScrollPosition";
import Footer from "./Footer";
type Props = {
  children: JSX.Element[] | JSX.Element;
  title?: string;
  description?: string;
  ogImage?: string;
};
export default function PublicLayout({
  children = <></>,
  title = "Bookingo...",
  description,
  ogImage,
}: Props) {
  const scrollPosition = useScrollPosition();
  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Head>
        {/* <meta property="og:url" content="https://yardcrm.vercel.app/" /> */}
        <meta property="og:type" content="website" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:image" content={ogImage} />
      </Head>
      <main>
        <div
          className={`fixed z-[999] right-6 bottom-6 common-transition
           ${
             scrollPosition > 300 && scrollPosition < 5900
               ? "translate-y-0 opacity-100"
               : "opacity-0 -translate-y-40"
           }
          `}
        >
          <div
            onClick={handleScrollTop}
            className="w-11 flex cursor-pointer items-center justify-center text-2xl h-11 rounded-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-[#BB5323] text-white"
          >
            <AiOutlineArrowUp />
          </div>
        </div>
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
}
