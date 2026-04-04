import type { ButtonProps } from "../../types/type";
import { Spinner } from "./Loader";

export const Button = ({
  variants,
  children,
  className,
  handleClick,
  isDisable,
  loading,
}: ButtonProps) => {
  const getClasses = () => {
    switch (variants) {
      case "primary":
        return "bg-primary-500 disable text-white hover:bg-primary-500/90 disabled:bg-primary-300 focus:ring-primary-300 ";
      case "secondary":
        return "bg-white text-primary-500 hover:bg-secondary-600 active:bg-secondary-700 focus:ring-secondary-300 ";
      default:
        break;
    }
  };
  return (
    <button
      onClick={handleClick}
      disabled={isDisable || loading}
      className={` ${getClasses()} ${className || ""}  transition ease-in-out duration-300 rounded-lg w-full p-2.5 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 md:text-base font-black tracking-[0.2px] outline-0 ring-0  leading-[150%]  dark:disabled:bg-primary-300 `}
    >
      {loading ? <Spinner color="primary" /> : children}
    </button>
  );
};
