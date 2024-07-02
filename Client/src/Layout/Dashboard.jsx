import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { BiDollar } from "react-icons/bi";
import { BsActivity, BsNewspaper, BsPeople } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import { FaHome, FaList } from "react-icons/fa";
import { GiGymBag } from "react-icons/gi";
import { MdClass, MdForum, MdSettingsApplications } from "react-icons/md";
import { SiManageiq } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import useCheckRole from "../Hooks/useCheckRole";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [role, isLoading] = useCheckRole();
  console.log(role, 'rrrroolllee');
  if (isLoading || loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div>
        <section className="">
          <div className="container px-6 m-auto">
            <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
              <div className="col-span-4 lg:col-span-3 h-full bg-purple-500 rounded-lg p-5">
                <ul className="menu space-y-5 mt-2 p-4">
                  {/* admin navbar */}
                  {role == "admin" && (
                    <>
                      <li>
                        <NavLink to={"/dashboard/all-trainers"}>
                          <GiGymBag /> All Trainers
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/dashboard/applied-trainers"}>
                          <MdSettingsApplications /> Applied Trainers
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/dashboard/balance"}>
                          <BiDollar /> Balance
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/dashboard/add-new-class"}>
                          <MdClass /> Add New Class
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/dashboard/get-newsletter-subscribers"}>
                          <BsNewspaper /> ALL Subscriber
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/dashboard/add-new-forum"}>
                          <MdForum /> Add New Forum
                        </NavLink>
                      </li>
                    </>
                  )}

                  {/* Trainer Navbar */}
                  {role == "trainer" && (
                    <>
                      <li>
                        <NavLink to={"/dashboard/manage-slot"}>
                          {" "}
                          <SiManageiq /> Manage Slots{" "}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/dashboard/add-new-slot"}>
                          {" "}
                          <CgAdd /> Add New Slot{" "}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/dashboard/add-new-forum"}>
                          {" "}
                          <MdForum /> Add New Forum{" "}
                        </NavLink>
                      </li>
                    </>
                  )}
                  {/* Users Navbar */}
                  {role == "member" && (
                    <>
                      <li>
                        <NavLink to={"/dashboard/user-activity"}>
                          {" "}
                          <BsActivity /> Activity{" "}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/dashboard/profile-page"}>
                          Profile Page
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/dashboard/booked-slot"}>
                          Booked Slot
                        </NavLink>
                      </li>
                    </>
                  )}

                  <div className="divider"></div>

                  <li>
                    <NavLink to={"/"}>
                      <FaHome />
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/classes"}>
                      <FaList />
                      Classes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/community"}>
                      <BsPeople />
                      Forum
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-span-4 lg:col-span-9 p-5">
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
