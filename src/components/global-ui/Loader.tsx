import type { SpinnerProps } from "../../types/type";

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-4",
};

const colorMap = {
  primary: "border-primary-500 border-t-transparent",
  white: "border-white border-t-transparent",
  gray: "border-gray-400 border-t-transparent",
};

export const Spinner = ({
  size = "md",
  color = "primary",
  className = "",
}: SpinnerProps) => {
  return (
    <div
      className={`
        animate-spin rounded-full
        ${sizeMap[size]}
        ${colorMap[color]}
        ${className}
      `}
    />
  );
};
