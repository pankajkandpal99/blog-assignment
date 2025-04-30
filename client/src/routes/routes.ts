import React, { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Blogs = lazy(() => import("../pages/Blogs"));
const BlogDetails = lazy(() => import("../pages/BlogDetails"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));

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
];

export const authRoutes: RouteConfig[] = [
  { path: "/login", element: Login },
  { path: "/register", element: Register },
];

export const protectedRoutes: RouteConfig[] = [
  { path: "/articles", element: Blogs, fullWidth: true },
  { path: "/article/:id", element: BlogDetails },
  { path: "/admin-dashboard", element: AdminDashboard },
];

export const notFoundRoute: RouteConfig = { path: "*", element: NotFound };
