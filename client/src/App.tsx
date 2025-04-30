import { useEffect } from "react";
import { AppRouter } from "./routes/AppRouter";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { verifyAuth } from "./features/auth/auth.slice";
import { UserService } from "./services/user.service";
import { setUser } from "./features/user/user.slice";
import { Loader } from "./components/general/Loader";
import { fetchBlogs } from "./features/blog/blog.slice";

function App() {
  const dispatch = useAppDispatch();
  const { initialized, authenticated } = useAppSelector((state) => state.auth);
  const { currentUser } = useAppSelector((state) => state.user);
  const { loading: blogsLoading } = useAppSelector((state) => state.blog);

  useEffect(() => {
    const initializeApp = async () => {
      dispatch(fetchBlogs());
      const authResult = await dispatch(verifyAuth());

      if (authResult.meta.requestStatus === "fulfilled") {
        const payload = authResult.payload as { authenticated: boolean };

        if (payload.authenticated && !currentUser) {
          try {
            const userResponse = await UserService.getCurrentUser();
            dispatch(setUser(userResponse.data));
          } catch (error) {
            console.error("Failed to fetch current user:", error);
          }
        }
      }
    };

    initializeApp();

    // Periodic checks for auth (optional)
    const interval = setInterval(() => {
      dispatch(verifyAuth());
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, authenticated, currentUser]);

  if (!initialized || (authenticated && blogsLoading && !currentUser)) {
    return <Loader size="large" />;
  }

  return <AppRouter />;
}

export default App;
