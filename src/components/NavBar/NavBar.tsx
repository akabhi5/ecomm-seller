const NavBar = () => {
  return (
    <nav className="flex justify-between items-center h-20 shadow-md p-4">
      <div className="text-3xl font-bold">Ecomm Seller</div>
      <div className="flex space-x-4 text-lg">
        <div>Login</div>
        <div>Register</div>
      </div>
    </nav>
  );
};

export default NavBar;
