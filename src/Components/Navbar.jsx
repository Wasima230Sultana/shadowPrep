import { NavLink } from "react-router";

const Navbar = () => {
    const links = (
  <>
    <NavLink
      to="/"
      className="px-4 py-2 hover:text-[#8b5cf6] transition-colors"
    >
      Home
    </NavLink>

    <NavLink
      to="/my-profile"
      className="px-4 py-2 hover:text-[#8b5cf6] transition-colors"
    >
      My Profile
    </NavLink>
  </>
);
  return (
   <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0f172a]/90 border-b border-white/10">
      <div className="navbar bg-[#0f172a] text-white shadow-lg">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 text-black font-bold rounded-box z-1 mt-3 w-52 p-2 shadow">
       {links}
      </ul>
    </div>
   <h2 className="text-sm md:text-2xl font-extrabold">
  SHADOW<span className="text-[#8b5cf6]">PREP</span>
</h2>
  </div>
  <div className="navbar-center hidden lg:flex">
   {links}
  </div>
  <div className="navbar-end gap-2">
    <button className="btn bg-[#8b5cf6] border-none text-white hover:bg-purple-700">
  Login
</button>

<button className="btn btn-outline border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white">
  Sign Up
</button>

  </div>
</div>
    </nav>
  );
};

export default Navbar;