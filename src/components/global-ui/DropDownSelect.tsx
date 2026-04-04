import { useRef, type FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { DropDownSelectProps } from "../../types/type";
import { chevronVariants, dropdownVariants } from "../../animation";
import useClickOutside from "../../hooks/useClickOutside";

export const DropDownSelect: FC<DropDownSelectProps & { className?: string }> = ({
  active,
  options,
  selected,
  setActive,
  setSelected,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, () => setActive(false), active);

  return (
    <div ref={ref} className={`relative ${className || "inline-block"}`}>
      <button
        type="button"
        onClick={() => setActive(!active)}
        className="w-full flex items-center justify-between gap-2 rounded-xl bg-gray-100 dark:bg-gray-800 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white"
      >
        <span>
          {options.find((o) => o.value === selected)?.label ?? selected}
        </span>
        <motion.span
          variants={chevronVariants}
          animate={active ? "open" : "closed"}
          initial="closed"
          className="flex"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {active && (
          <motion.ul
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute left-0 z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  setSelected(option.value);
                  setActive(false);
                }}
                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDownSelect;
