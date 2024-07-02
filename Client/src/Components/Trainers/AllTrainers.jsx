import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import useTrainersData from "../../Hooks/useTrainersData";
import TrainerCard from "./TrainerCard";
import { AuthContext } from "../../Context/AuthProvider";

const AllTrainers = () => {
  const {loading} = useContext(AuthContext);
  const [trainers, isLoading] = useTrainersData();
  if(isLoading || loading){
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
  }
  return (
    <>
    <Helmet>
        <title>Trainers</title>
    </Helmet>
    <div className="grid lg:grid-cols-3 gap-4">
      {
        trainers.map(trainer => <TrainerCard key={trainer._id} trainer={trainer}/>)
      }
    </div>
    </>
  );
};

export default AllTrainers;
