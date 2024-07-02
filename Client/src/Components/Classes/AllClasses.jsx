import React from "react";
import useClasses from "../../Hooks/useClasses";
import ClassCard from "./ClassCard";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {
  const [classes,refetch, isPending,  isLoading] = useClasses();
  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Classes</title>
      </Helmet>
      <div className="grid grid-cols-3 gap-8">
        {classes.map((cls) => (
          <ClassCard data={cls} key={cls._id} />
        ))}
      </div>
    </>
  );
};

export default AllClasses;
