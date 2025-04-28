import React, { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));

const Support = lazy(() => import("../pages/Support"));
const Services = lazy(() => import("../pages/Services"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

interface RouteConfig {
  path: string;
  element: React.ComponentType;
  fullWidth?: boolean;
}

export const publicRoutes: RouteConfig[] = [
  { path: "/", element: Home, fullWidth: true },
  { path: "/about", element: About },

  { path: "/support", element: Support },
  { path: "/services", element: Services },
];

export const authRoutes: RouteConfig[] = [
  { path: "/login", element: Login },
  { path: "/register", element: Register },
];

export const protectedRoutes: RouteConfig[] = [
  { path: "/admin-dashboard", element: AdminDashboard },
];

export const notFoundRoute: RouteConfig = { path: "*", element: NotFound };
