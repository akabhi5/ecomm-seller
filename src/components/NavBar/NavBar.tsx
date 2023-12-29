import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { logout } from "../../store/slices/userSlice";
import { clearAuthCookies } from "../../cookie";
import { useQueryClient } from "@tanstack/react-query";
import { setHttpToken } from "../../api-client";

const NavBar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onLogout = () => {
    clearAuthCookies();
    dispatch(logout());
    navigate("/login");
    queryClient.removeQueries();
    setHttpToken(); // since cookies are already clear it will be set to null
  };

  return (
    <nav className="flex justify-between items-center h-20 shadow-md p-4">
      <Link to="/" className="text-3xl font-bold">
        Ecomm Seller
      </Link>

      <div className="flex space-x-4 text-lg">
        {isLoggedIn ? (
          <>
            <div className="cursor-pointer" onClick={onLogout}>
              Logout
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
