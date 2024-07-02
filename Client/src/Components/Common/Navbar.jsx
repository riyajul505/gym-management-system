
import { useContext, useState } from "react";
import { BiLogIn, BiUser } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaRegistered } from "react-icons/fa6";
import { IoBody } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MdClass, MdDashboard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
const Navbar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { user, loading, logOut } = useContext(AuthContext);
  const handleLogOut = () =>{
    logOut()
  }
  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
  }
  const navOptions = (
    <>
      

      {/* for all */}

      <li role="none" className="flex items-stretch">
        <Link
          to={"/"}
          role="menuitem"
          aria-haspopup="false"
          className="flex items-center gap-2 py-2 px-2  lg:px-4 hover:bg-gray-300 hover:rounded-2xl"
          href="javascript:void(0)"
        >
          <span className="flex flex-col justify-center items-center gap-1"> <FaHome/> Home</span>
        </Link>
      </li>
      {/* if user logged in */}
      {user && (
        <>
          <li role="none" className="flex items-stretch">
            <NavLink
                to={'/dashboard'}
              role="menuitem"
              aria-haspopup="false"
              className="flex items-center gap-2 py-2 px-2 lg:px-4 hover:bg-gray-300 hover:rounded-2xl"
              href="javascript:void(0)"
            >
              <span className="flex flex-col justify-center items-center gap-1"> <MdDashboard/> Dashboard</span>
            </NavLink>
          </li>
        </>
      )}
      <li role="none" className="flex items-stretch">
        <Link
          to={"/trainer"}
          role="menuitem"
          aria-haspopup="false"
          className="flex items-center gap-2 py-2 px-2  lg:px-4 hover:bg-gray-300 hover:rounded-2xl"
          href="javascript:void(0)"
        >
          <span className="flex flex-col justify-center items-center gap-1"> <IoBody/> Trainer</span>
        </Link>
      </li>
      <li role="none" className="flex items-stretch">
        <Link
          to={"/classes"}
          role="menuitem"
          aria-haspopup="false"
          className="flex items-center gap-2 py-2 px-2  lg:px-4 hover:bg-gray-300 hover:rounded-2xl"
          href="javascript:void(0)"
        >
          <span className="flex flex-col justify-center items-center gap-1"> <MdClass/> Classes</span>
        </Link>
      </li>
      <li role="none" className="flex items-stretch">
        <Link
          to={"/community"}
          role="menuitem"
          aria-haspopup="false"
          className="flex items-center gap-2 py-2 px-2  lg:px-4 hover:bg-gray-300 hover:rounded-2xl"
          href="javascript:void(0)"
        >
          <span className="flex flex-col justify-center items-center gap-1"> <BiUser className="text-lg "/> Community</span>
        </Link>
      </li>
      {
        user && <li
        onClick={handleLogOut}
         role="none" className="flex items-stretch">
        <Link
          to={"/"}
          role="menuitem"
          aria-haspopup="false"
          className="flex items-center gap-2 py-2 px-2  lg:px-4 hover:bg-gray-300 hover:rounded-2xl"
          href="javascript:void(0)"
        >
          <span className="flex flex-col justify-center items-center gap-1"> <LuLogOut className="text-lg"/> Log Out</span>
        </Link>
      </li>
      }

      {/* If User is not logged in */}
      {!user && (
        <>
          <li role="none" className="flex items-stretch">
            <NavLink
              to={"/login"}
              role="menuitem"
              aria-haspopup="false"
              className="flex items-center gap-2 py-2 px-2 lg:px-4 hover:bg-gray-300 hover:rounded-2xl"
            >
              <span className="flex flex-col justify-center items-center gap-1"> <BiLogIn/> Login</span>
            </NavLink>
          </li>
          <li role="none" className="flex items-stretch">
            <NavLink
              to={"/register"}
              role="menuitem"
              aria-current="page"
              aria-haspopup="false"
              className="flex items-center gap-2 py-2 px-2 lg:px-4 hover:bg-gray-300 hover:rounded-2xl"
            >
              <span className="flex flex-col justify-center items-center gap-1"> <FaRegistered/> Register</span>
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div>
      <header className="border-b-1 relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <NavLink
              to={"/"}
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
            >
              FitScheduler
            </NavLink>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                  : ""
              }
            `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              {navOptions}
            </ul>
            {user && (
              <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
                {/*        <!-- Avatar --> */}
                <a
                  href="#"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
                >
                  <img
                    src={user.photoURL}
                    alt="user name"
                    title="user name"
                    width="40"
                    height="40"
                    className="max-w-full rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-secondary p-1 text-sm text-white">
                    <span className="sr-only"> 7 new emails </span>
                  </span>
                </a>
                {/*        <!-- End Avatar --> */}
              </div>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
