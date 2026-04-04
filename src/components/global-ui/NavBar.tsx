import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { ROUTES } from "../../routes";
import { useRef, useState } from "react";
import HamburgerButton from "./Hamburger";
import useClickOutside from "../../hooks/useClickOutside";
import { useAuthStore } from "../../store/authStore";
import { Moon, Sun } from "lucide-react";

type NavBarProps = {
  toggleSidebar: () => void;
  isOpen: boolean;
};

export const NavBar = ({ toggleSidebar, isOpen }: NavBarProps) => {
  const location = useLocation();
  const theme = useTheme((themeStore) => themeStore.theme);
  const toggleTheme = useTheme((themeStore) => themeStore.toggleTheme);

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(profileRef, () => setProfileOpen(false), profileOpen);

  const { currentUser } = useAuthStore();

  const title =
    Object.values(ROUTES)
      .flat()
      .flatMap((route) => [route, ...(route.subRoutes ?? [])])
      .find((route) => route.path === location.pathname)?.name ?? "Dashboard";

  const shortName = currentUser.name
    .split(" ")
    .map((namePart) => namePart[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="pb-6 pt-9 px-5 md:px-10 dark:bg-gray-900 bg-white">
      <nav className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          <HamburgerButton isOpen={isOpen} toggle={toggleSidebar} />

          <h1 className="md:text-2xl font-bold hidden lg:flex dark:text-gray-50 capitalize">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex justify-between items-center px-2 py-2.5  gap-2 rounded-full border bg-primary-100 border-gray-50  cursor-pointer dark:bg-gray-700 dark:border-gray-700 transition ease-in-out duration-300"
          >
            <span className="text-xs font-medium text-gray-700 dark:text-gray-50 capitalize transition ease-in-out duration-300">
              {theme} mode
            </span>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-50 capitalize transition ease-in-out duration-300">
              {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            </span>
          </button>
          {/* Profile */}
          <div className="relative">
            <button
              className={`flex items-center cursor-pointer gap-3 p-2 transition ease-in-out duration-300 rounded-full dark:bg-gray-800 dark:text-white bg-gray-100`}
            >
              <div className="size-8 rounded-full bg-primary-100 flex items-center justify-center">
                {currentUser.profilePictureUrl ? (
                  <img
                    src={currentUser.profilePictureUrl}
                    alt={currentUser.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-bold text-primary-500">
                    {shortName}
                  </span>
                )}
              </div>

              <span className="hidden md:block font-semibold">
                {currentUser.name.split(" ")[0]}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
