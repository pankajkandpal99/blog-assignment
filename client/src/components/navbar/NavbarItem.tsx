import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavbarItemType } from "../../types/navbarTypes";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface NavbarItemProps {
  item: NavbarItemType;
  isMobile?: boolean;
  onClick?: () => void;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({
  item,
  isMobile = false,
  onClick,
}) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;

  return (
    <motion.li
      className={cn("relative list-none", isMobile ? "w-full" : "inline-flex")}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 15 },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
    >
      <Link
        to={item.href}
        onClick={onClick}
        className={cn(
          "group flex items-center w-full px-4 py-2.5 text-sm font-medium transition-all duration-200",
          "rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          isActive
            ? "text-primary dark:text-primary-foreground font-semibold"
            : "text-foreground/90 hover:text-primary dark:text-foreground/70 dark:hover:text-primary-foreground",
          isMobile ? "text-base py-3 px-5" : ""
        )}
        aria-current={isActive ? "page" : undefined}
      >
        <span className="relative z-10">
          {item.label}
          {isActive && (
            <motion.span
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
              layoutId="underline"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </span>

        {!isActive && (
          <motion.span
            className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            layoutId="hover-bg"
          />
        )}
      </Link>
    </motion.li>
  );
};
