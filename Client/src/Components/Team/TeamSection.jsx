import React from "react";
import useTrainersData from "../../Hooks/useTrainersData";

const TeamSection = () => {
  const [trainers, isLoading] = useTrainersData();
  
  return (
    <div>
      <section className="py-6 bg-gray-100 text-gray-800">
        <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
          <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">
            Our Trainers
          </h1>
          <p className="max-w-2xl text-center text-gray-600">
            Meet our dedicated fitness experts, committed to guiding you on your
            health journey with passion and expertise.
          </p>
          <div className="flex flex-row flex-wrap-reverse justify-center">
            {
                trainers.map(i => <div key={i._idx} className="flex flex-col justify-center m-8 text-center">
                <img
                  alt=""
                  className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full bg-gray-500"
                  src={i.image}
                />
                <p className="text-xl font-semibold leading-tight">
                  {i.name}
                </p>
                <p className="text-gray-600">{i.specialization}</p>
              </div>)
            }       
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamSection;
