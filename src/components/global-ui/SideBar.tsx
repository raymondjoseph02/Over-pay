import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon, CheckSquare, Square, ArrowLeftRight } from "lucide-react";
import { LogoTextIcon } from "../../assets/svg/icons";
import LogoImage from "../../assets/img/logo.png";
import { ROUTES } from "../../routes";
import { SideBarLink } from "./SidbarLinks";
import { useAuthStore } from "../../store/authStore";
import { useTheme } from "../../context/ThemeContext";
import { appUsers } from "../../data/users";

type SideBarProps = {
  closeSidebar: () => void;
};

export const SideBar = ({ closeSidebar }: SideBarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, setCurrentUser } = useAuthStore();
  const theme = useTheme((s) => s.theme);
  const toggleTheme = useTheme((s) => s.toggleTheme);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const visibleRoutes = ROUTES["dashboard"].filter(
    (route) => !route.adminOnly || currentUser.role === "admin",
  );

  return (
    <aside className="dark:bg-gray-800 pb-10 pt-11 w-62.5 max-w-3xs bg-gray-50 px-6 flex flex-col justify-between h-full">
      <div>
        <div aria-label="over pay logo" className="flex gap-1 items-end">
          <img src={LogoImage} alt="over pay logo" className="h-6 w-auto" />
          <span className="text-gray-600 dark:text-white">
            <LogoTextIcon />
          </span>
        </div>
        <hr className="mb-10 mt-8 bg-gray-300 dark:bg-gray-700 h-px" />
        <nav className="flex flex-col gap-1">
          {visibleRoutes.map((route) => (
            <SideBarLink
              key={route.path}
              route={route}
              isOpen={openDropdown === route.path}
              setOpen={setOpenDropdown}
              pathname={pathname}
              navigate={navigate}
              closeSidebar={closeSidebar}
            />
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-2 p-3 rounded-xl text-gray-600 dark:text-gray-400 text-sm font-medium cursor-pointer hover:bg-primary-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-primary-400 transition ease-in-out duration-300"
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>

        {/* User / role switcher */}
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1.5 px-1 flex items-center gap-2 ">
            <span>Switch role</span>
            <ArrowLeftRight size={16} />
          </p>
          <div className="flex flex-col gap-1">
            {appUsers.map((u) => {
              const isActive = currentUser.id === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => setCurrentUser(u)}
                  className="w-full flex items-center gap-2 p-3 rounded-xl text-sm font-medium cursor-pointer transition ease-in-out duration-300 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-primary-400"
                >
                  {isActive ? (
                    <CheckSquare
                      size={16}
                      className="text-primary-500 shrink-0"
                    />
                  ) : (
                    <Square size={16} className="shrink-0" />
                  )}
                  <span className="truncate capitalize">{u.role}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};
