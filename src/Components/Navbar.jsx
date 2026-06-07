import { NavLink } from "react-router";

const Navbar = () => {
    const links = <>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/my-profile">My Profile</NavLink>
    </>
  return (
    <nav className='shadow-sm'>
      <div className="navbar bg-gray-300 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {links}
      </ul>
    </div>
    <h2 className="brand text-xl font-bold shadow-xs p-1">SHADOW<span className="text-primary">PREP</span></h2>
  </div>
  <div className="navbar-center hidden lg:flex">
   {links}
  </div>
  <div className="navbar-end gap-2">
    <button className="btn btn-primary">Login</button>
    <button className="btn btn-primary">Sign Up</button>

  </div>
</div>
    </nav>
  );
};

export default Navbar;