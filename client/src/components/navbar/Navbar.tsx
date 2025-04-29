import React from "react";
import { NavbarItem } from "./NavbarItem";
import { Link } from "react-router-dom";
import { NavbarItemType } from "../../types/navbarTypes";
import AuthButtons from "../auth/AuthButtons";
import MobileMenu from "./MobileMenu";
import { motion } from "framer-motion";
import { useAdminAuth } from "../../hooks/useAdminAuth";

interface iAppNavbarProps {
  items: NavbarItemType[];
}

export const Navbar: React.FC<iAppNavbarProps> = ({ items }) => {
  const { isAdmin } = useAdminAuth();
  const filteredItems = items.filter(
    (item) => item.href !== "/admin-dashboard" || isAdmin
  );

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md py-3 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200" />
            <div className="relative bg-white dark:bg-gray-900 rounded-full p-1.5 shadow-sm border border-gray-200 dark:border-gray-700 group-hover:shadow-md transition-all duration-300">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-600">
                  DI
                </span>
              </div>
            </div>
          </motion.div>
          <span className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-600 tracking-tight group-hover:bg-[length:200%_100%] bg-[length:100%_100%] transition-[background-size] duration-500">
            DevInsight
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {filteredItems.map((item) => (
            <NavbarItem key={item.id} item={item} />
          ))}
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          {isAdmin && (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md font-semibold uppercase tracking-wider">
                ADMIN
              </span>
              <div className="w-[1px] h-6 bg-gray-300 dark:bg-gray-600"></div>
            </div>
          )}

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex">
            <AuthButtons />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu items={filteredItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};
