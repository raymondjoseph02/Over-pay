import { ChevronDownIcon, ChevronUpIcon } from "../../assets/svg/icons";
import type { NavItemProps, Route } from "../../types/type";

const linkClass =
  "p-3 sm:p-4 flex gap-3 items-center justify-between font-black text-sm leading-[150%] tracking-[0.2px] cursor-pointer rounded-xl capitalize";

const activeClass = "bg-primary-500 text-white";

const inactiveClass =
  "text-gray-600 dark:text-gray-500 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700";

export const SideBarLink = ({
  route,
  isOpen,
  setOpen,
  pathname,
  navigate,
  closeSidebar,
}: NavItemProps) => {
  const isRouteActive = route.hasSubRoutes
    ? route.subRoutes?.some((sub: Route) => sub.path === pathname)
    : pathname === route.path;

  const handleHasSub = () => {
    if (isOpen) {
      setOpen(null);
    } else {
      setOpen(route.path);

      // auto navigate to first sub route
      if (route.subRoutes?.[0]?.path) {
        navigate(route.subRoutes[0].path);
      }
    }
  };

  const handleNormalLink = () => {
    setOpen(null);
    navigate(route.path);
    closeSidebar?.();
  };

  if (route.hasSubRoutes) {
    return (
      <div>
        <button
          onClick={handleHasSub}
          className={`w-full ${linkClass} ${
            isOpen || isRouteActive ? activeClass : inactiveClass
          }`}
        >
          {route.icon}
          <span className="flex-1 text-left">{route.name}</span>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>

        {isOpen && (
          <div className=" flex flex-row gap-2.5 mt-2 ml-6">
            <div className="min-h-19 h-full! w-px dark:bg-gray-700"></div>
            <div>
              {route.subRoutes?.map((sub: Route) => (
                <button
                  key={sub.path}
                  onClick={() => {
                    setOpen(route.path);
                    navigate(sub.path);
                  }}
                  className={`w-full ${linkClass} ${
                    pathname === sub.path
                      ? "text-primary-500"
                      : "dark:text-gray-500 font-medium text-sm hover:dark:text-primary-300"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleNormalLink}
      className={`w-full ${linkClass} ${
        pathname === route.path ? activeClass : inactiveClass
      }`}
    >
      <div className="flex items-center gap-2.5">
        {route.icon}
        {route.name}
      </div>
      {route.barge && (
        <div className="size-5 rounded-full dark:bg-white font-medium text-white dark:text-gray-900 text-xs leading-[150%] tracking-[0.4px] flex items-center justify-center bg-secondary-500">
          {route.bargeValue}
        </div>
      )}
    </button>
  );
};
