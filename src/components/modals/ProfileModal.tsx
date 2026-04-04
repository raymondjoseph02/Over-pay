import type { ProfileDropdownProps } from "../../types/type";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { iconMapper } from "../../utility/iconMapper";

export const ProfileModal = ({
  options,
  isOpen,
  theme,
  toggleTheme,
  user,
}: ProfileDropdownProps) => {
  const navigate = useNavigate();

  const handleProfileAction = (action: string) => {
    switch (action.toLowerCase()) {
      case "PROFILE".toLowerCase():
        navigate("/profile");
        break;
      case "SETTINGS":
        navigate("/settings");
        break;
      case "LOGOUT":
        break;
      default:
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white w-64 dark:bg-gray-800 px-4 py-2 rounded-xl absolute top-[calc(100%+0.5rem)] right-0 shadow-lg space-y-2 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Current user info */}
        <div className="space-y-1 flex flex-col px-2 w-full items-start pt-1">
          <div className="flex items-center gap-2 w-full">
            <p className="text-base font-black text-gray-900 leading-[150%] tracking-[0.2px] dark:text-gray-50 truncate max-w-full">
              {user.name}
            </p>
            {user.role === "admin" && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary-500/10 text-primary-500 shrink-0">
                Admin
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-600 leading-[150%] tracking-[0.4px]">
            {user.accountType} account
          </p>
        </div>

        <hr className="border-gray-100 dark:border-gray-700" />

        <hr className="border-gray-100 dark:border-gray-700" />

        {/* Options */}
        <div>
          {options.map((option, index) => {
            const Icon = iconMapper[option.icon];
            return (
              <button
                key={index}
                onClick={() => handleProfileAction(option.name)}
                className="flex items-center gap-2 py-3 w-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition duration-150 px-2 dark:text-gray-600 rounded-lg"
              >
                <Icon />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-50 capitalize">
                  {option.name}
                </span>
              </button>
            );
          })}
        </div>

        <hr className="border-gray-100 dark:border-gray-700" />

        {/* Theme toggle */}
        <div className="flex justify-between items-center px-2 py-2.5">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-50 capitalize">
            {theme} mode
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary-500 transition-colors duration-300"></div>
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5"></div>
          </label>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
