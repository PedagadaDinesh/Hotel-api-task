import { useRef, useEffect } from "react";

const Drawer = ({
  open,
  onClose,
  anchor,
  children,
  drawerStyle,
}: {
  open: boolean;
  onClose: () => void;
  anchor: "bottom" | "left" | "right" | "top";
  children: JSX.Element | JSX.Element[];
  drawerStyle?: string;
}) => {
  const mainDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        mainDivRef.current &&
        !(
          event.target instanceof Node &&
          mainDivRef.current.contains(event.target)
        )
      ) {
        onClose();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const initialTranslate = {
    bottom: "translate-y-0",
    left: "translate-x-0",
    right: "translate-x-0",
    top: "translate-x-0",
  };
  const endTranslate = {
    bottom: "translate-y-[100%]",
    left: "-translate-x-[100%]",
    right: "translate-x-[100%]",
    top: "-translate-y-[100%]",
  };
  const initialPositionChart = {
    bottom: "bottom-0",
    left: "left-0",
    right: "right-0",
    top: "top-0",
  };
  return (
    <div
      className={`${
        open
          ? `opacity-100 ${initialTranslate[anchor]} bg-[#00000080]`
          : `${endTranslate[anchor]} opacity-50`
      } fixed inset-0 min-h-screen w-full delay-animation z-[999]`}
    >
      <div className={`relative w-full h-full`}>
        <div
          ref={mainDivRef}
          style={{
            backgroundColor: "#ffffff",
          }}
          className={`overflow-scroll scroll-bar-none ${drawerStyle} delay-animation absolute shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ${initialPositionChart[anchor]}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
