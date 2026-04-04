import { useRef, useState } from "react";
import { VerticalMoreIcon } from "../../assets/svg/icons";
import { cards } from "../../data/data";
import { CardSwiper } from "../atm-card";
import { walletsCta } from "../../data/data";
import { AnimatePresence, motion } from "framer-motion";
import { dropdownVariants } from "../../animation";
import useClickOutside from "../../hooks/useClickOutside";
import { WalletAction } from "../dashboard/WalletAction";

const menuOptions = [
  { label: "Add new card" },
  { label: "Manage cards" },
  { label: "Transaction history" },
  { label: "Card settings" },
];

export const WalletWidget = () => {
  const [activeCard, setActiveCard] = useState("1");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);

  return (
    <div className="py-6 px-4 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden h-fit">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-900 font-black text-lg leading-[135%] tracking-[0.2px] dark:text-gray-50">
          Wallet
        </p>
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-400 dark:text-gray-600 cursor-pointer"
          >
            <VerticalMoreIcon />
          </button>

          <AnimatePresence initial={false}>
            {menuOpen && (
              <motion.ul
                variants={dropdownVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg"
              >
                {menuOptions.map((opt) => (
                  <li
                    key={opt.label}
                    onClick={() => setMenuOpen(false)}
                    className="cursor-pointer px-4 py-2.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {opt.label}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
      <CardSwiper
        cards={cards}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
      <div className="flex justify-center w-full items-center mt-10">
        {walletsCta.map((cta, index) => (
          <WalletAction
            key={index}
            name={cta.name}
            action={cta.action}
            icon={cta.icon}
          />
        ))}
      </div>
    </div>
  );
};
