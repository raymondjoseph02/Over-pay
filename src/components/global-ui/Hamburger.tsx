import { motion } from "framer-motion";
import { topLine, middleLine, bottomLine } from "../../animation/index";
import type { HamburgerProps } from "../../types/type";

const HamburgerButton = ({ toggle, isOpen }: HamburgerProps) => {
  return (
    <button
      onClick={toggle}
      className="lg:hidden bg-gray-50 dark:bg-gray-800 p-3 rounded-full text-gray-900 dark:text-white cursor-pointer size-12 space-y-1.5"
    >
      <motion.span
        className="block w-full h-0.5 bg-gray-900 dark:bg-white rounded"
        animate={isOpen ? "open" : "closed"}
        variants={topLine}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      <motion.span
        className="block w-full h-0.5 bg-gray-900 dark:bg-white rounded"
        animate={isOpen ? "open" : "closed"}
        variants={middleLine}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      <motion.span
        className="block w-full h-0.5 bg-gray-900 dark:bg-white rounded"
        animate={isOpen ? "open" : "closed"}
        variants={bottomLine}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
    </button>
  );
};

export default HamburgerButton;
