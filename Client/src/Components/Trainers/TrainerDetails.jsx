import React from "react";
import { Helmet } from "react-helmet-async";
import { BiDownArrow } from "react-icons/bi";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const TrainerDetails = () => {
  const data = useLoaderData();
  const availableSlot = data.availableSlots.filter((slot) => !slot.isBooked);
  const navigate = useNavigate();
  const className = data.specialization;
  const handleSlotClick = (day, time) => {
    const clicked = { day, time, className };
    navigate(`/booking/${data._id}`, { state: { clicked } });
  };

  return (
    <>
    <Helmet>
        <title>Trainer Details</title>
    </Helmet>
    <div>
      <section className="dark:bg-gray-100 dark:text-gray-800">
        <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-5xl dark:text-gray-900">
              {data.name}
            </h2>
            <p className="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-600">
              {data.bio}
            </p>
          </div>
          <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl dark:text-gray-900">
                {data.specialization} Specialist
              </h3>
              <p className="mt-3 text-3xl text-gray-600 font-bold">
                {data.experience}yr of Experience
              </p>
              <div className="mt-12 space-y-12">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-violet-600 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 flex justify-center items-center">
                    <h4 className="text-lg font-medium leading-6 text-gray-900 text-center flex justify-center items-center">
                      {data.expertise[0]}
                    </h4>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-violet-600 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 flex justify-center items-center">
                    <h4 className="text-lg font-medium leading-6 dark:text-gray-900">
                      {data.expertise[1]}
                    </h4>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-violet-600 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium leading-6 dark:text-gray-900 flex gap-2 items-center">
                      Certificates <BiDownArrow />
                    </h4>
                    <div className="mt-2 dark:text-gray-600">
                      <ul>
                        {data.certifications.map((i, idx) => (
                          <li className="text-xl" key={idx}>
                            {idx + 1}. {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="mt-10 lg:mt-0">
              <img
                src={data.image}
                alt=""
                className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
              />
            </div>
          </div>
          {/* Available Slots */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">Available Slots</h1>
            <div className="flex gap-5">
              {availableSlot.map((i, idx) => (
                <button
                  onClick={() => {
                    handleSlotClick(i.day, i.time);
                  }}
                  key={idx}
                  className="btn btn-primary"
                >
                  {i.day} {i.time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-6 bg-gray-100 text-gray-900">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:flex-row lg:justify-between">
          <h1 className="text-3xl font-semibold leading-tight text-center lg:text-left">
            Want to be a Trainer?
          </h1>
          <Link to={"/be-a-trainer"}>
            <button className="btn px-8 py-3 text-lg font-semibold rounded bg-violet-600 text-gray-50">
              Become a Trainer
            </button>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
};

export default TrainerDetails;
