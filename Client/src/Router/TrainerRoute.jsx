import React, { useContext } from "react";
import useCheckRole from "../Hooks/useCheckRole";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate } from "react-router-dom";

const TrainerRoute = ({ children }) => {
  const [adminRole, isLoading] = useCheckRole();
  const { user, loading } = useContext(AuthContext);
  if (loading || isLoading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (adminRole == "trainer" && user) {
    return children;
  }
  return <Navigate to={"/"}></Navigate>;
};

export default TrainerRoute;
