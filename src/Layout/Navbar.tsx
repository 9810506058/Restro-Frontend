import { NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, isLoggedIn, handleLogout, handleLogin } = useAuth();

  return (
    <nav className="flex gap-4 p-4 bg-gray-100">
      <NavLink to="/home" className="text-blue-600">Home</NavLink>
      <NavLink to="/about" className="text-blue-600">About</NavLink>
      <NavLink to="/contact" className="text-blue-600">Contact</NavLink>

      <div className="ml-auto flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <span className="text-gray-700">{user?.name}</span>
<img src={user?.image ?? "/default-avatar.png"} className="rounded px-1.5 py-1" alt="User avatar" />

            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <button onClick={handleLogin} className="bg-green-500 text-white px-3 py-1 rounded">Login with Google</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
