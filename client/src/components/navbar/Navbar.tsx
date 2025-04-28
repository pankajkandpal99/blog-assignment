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
            <div className="relative bg-white dark:bg-gray-900 rounded-full p-1">
              {/* Replace with your logo component */}
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="text-xl font-bold">BP</span>
              </div>
            </div>
          </motion.div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-600">
            BlogPage
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {filteredItems.map((item) => (
            <NavbarItem key={item.id} item={item} />
          ))}
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex">
            <AuthButtons />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <MobileMenu items={filteredItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};
