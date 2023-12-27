import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store/store";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.token);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
