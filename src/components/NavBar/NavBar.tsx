import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center h-20 shadow-md p-4">
      <div className="text-3xl font-bold">Ecomm Seller</div>
      <div className="flex space-x-4 text-lg">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default NavBar;
