import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { logout } from "../../store/slices/userSlice";
import { clearAuthCookies } from "../../cookie";

const NavBar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
    clearAuthCookies();
  };

  return (
    <nav className="flex justify-between items-center h-20 shadow-md p-4">
      <div className="text-3xl font-bold">Ecomm Seller</div>

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
