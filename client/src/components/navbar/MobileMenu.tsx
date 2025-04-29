import React from "react";
import { NavbarItem } from "./NavbarItem";
import { NavbarItemType } from "../../types/navbarTypes";
import AuthButtons from "../auth/AuthButtons";
import { motion } from "framer-motion";
import { X, User, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerPortal,
  DrawerTrigger,
} from "../ui/drawer";
import { Separator } from "../ui/separator";

interface MobileMenuProps {
  items: NavbarItemType[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ items }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const displayName = currentUser?.name || "Guest";
  const displayEmail = currentUser?.email;
  const isGuest = !authenticated;
  const isAdmin = currentUser?.role === "ADMIN";

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <button
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu size={24} strokeWidth={2} className="text-primary" />
          </button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerContent className="fixed inset-y-0 right-0 h-full w-72 max-h-screen bg-background border-l shadow-2xl z-50">
            <div className="h-full flex flex-col max-h-screen">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-70" />
                    <div className="w-4 h-4 flex items-center justify-center">
                      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-600">
                        DI
                      </span>
                    </div>
                  </div>
                  <span className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    DevInsight
                  </span>
                </div>
                <DrawerClose className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors">
                  <X size={20} />
                </DrawerClose>
              </div>

              <div className="flex-1 overflow-y-auto px-4">
                <motion.div
                  initial="closed"
                  animate="open"
                  variants={itemVariants}
                  className={`mb-4 bg-muted p-4 rounded-lg border border-primary shadow-md ${
                    isGuest ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative">
                      <div
                        className={`absolute -inset-1 ${
                          isGuest ? "bg-muted" : "bg-accent/20"
                        } rounded-full blur-sm`}
                      ></div>
                      <div
                        className={`relative flex items-center justify-center w-10 h-10 ${
                          isGuest ? "bg-muted" : "bg-accent/20"
                        } rounded-full`}
                      >
                        <User
                          size={20}
                          className={
                            isGuest ? "text-muted-foreground" : "text-accent"
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-foreground">
                        {displayName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {isGuest ? "Not logged in" : "Logged in"}
                        {isAdmin && (
                          <span className="ml-2 px-1.5 py-0.5 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase rounded-md">
                            ADMIN
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {displayEmail && (
                    <div className="bg-background/60 p-2 rounded-md">
                      <span className="text-sm text-muted-foreground">
                        Email
                      </span>
                      <div className="text-sm font-medium text-foreground truncate">
                        {displayEmail}
                      </div>
                    </div>
                  )}
                </motion.div>

                <div className="h-px w-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 my-6"></div>

                <nav className="space-y-1 pb-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial="closed"
                      animate="open"
                      variants={itemVariants}
                      custom={index}
                    >
                      <DrawerClose asChild>
                        <div className="py-1 px-2 text-sm rounded-lg hover:bg-muted transition-colors">
                          <NavbarItem item={item} isMobile />
                        </div>
                      </DrawerClose>
                    </motion.div>
                  ))}
                </nav>

                <Separator className="text-primary" />

                <div className="bg-background px-0 pt-4 bottom-0">
                  <motion.div
                    initial="closed"
                    animate="open"
                    variants={itemVariants}
                  >
                    <AuthButtons isMobile />
                  </motion.div>
                </div>
              </div>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
