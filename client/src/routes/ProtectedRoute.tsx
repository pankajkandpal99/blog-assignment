import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MainLayout } from "../layouts/mainLayout";
import { Loader } from "../components/general/Loader";
import { Button } from "../components/ui/button";

export const ProtectedRoute = () => {
  const { authenticated, initialized, loading } = useAuth();
  const navigate = useNavigate();

  if (loading || !initialized) {
    return (
      <MainLayout>
        <Loader size="large" />
      </MainLayout>
    );
  }

  if (!authenticated) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            Please login to view this content
          </p>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
