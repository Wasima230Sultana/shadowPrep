


import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { IoPersonCircleSharp } from "react-icons/io5";
import { ClockLoader } from "react-spinners";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        // console.log("Successfully signed out");
        toast.success("Signed out successfully");
      })
      .catch((error) => {
        // console.error(error);
        toast.error(error.message);
      });
  };

   const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition-all duration-300 ${
      isActive
        ? "text-[#8b5cf6] font-semibold bg-white/5"
        : "text-violet hover:text-[#8b5cf6]"
    }`;

  const links = (
    <>
      <NavLink to="/" className={navClass}>
        Home
      </NavLink>

      <NavLink to="/category" className={navClass}>
        All Category
      </NavLink>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0f172a]/90 border-b border-white/10">
      <div className="navbar bg-[#0f172a] text-white shadow-lg">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 text-black font-bold shadow z-[1]"
            >
              {links}
            </ul>
          </div>

          <Link
            to="/"
            className="text-xl md:text-2xl font-extrabold tracking-wide"
          >
            SHADOW<span className="text-[#8b5cf6]">PREP</span>
          </Link>

        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          {links}
        </div>

        {/* Right */}
        <div className="navbar-end gap-3">

          {loading ? (
            <ClockLoader size={24} color="#8b5cf6" />
          ) : user ? (
            <>
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName || user.email}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-[#8b5cf6] object-cover cursor-pointer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white font-bold cursor-pointer">
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : user.email.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <button
                onClick={handleSignOut}
                className="btn bg-[#8b5cf6] border-none text-white hover:bg-purple-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="btn bg-[#8b5cf6] border-none text-white hover:bg-purple-700"
              >
                Login
              </Link>

              <Link
                to="/auth/register"
                className="btn btn-outline border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
