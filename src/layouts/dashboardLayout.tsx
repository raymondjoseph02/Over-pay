import { Outlet } from "react-router-dom";
import { NavBar } from "../components/global-ui/NavBar";
import { SideBar } from "../components/global-ui/SideBar";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="flex h-dvh overflow-hidden dark:bg-gray-900 bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-dvh shrink-0">
        <SideBar closeSidebar={closeSidebar} />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={closeSidebar}
            />

            {/* Sidebar */}
            <motion.div
              key="sidebar"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-dvh z-50 lg:hidden"
            >
              <SideBar closeSidebar={closeSidebar} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavBar toggleSidebar={toggleSidebar} isOpen={isOpen} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
