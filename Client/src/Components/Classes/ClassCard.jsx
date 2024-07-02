import React from "react";
import { Link } from "react-router-dom";

const ClassCard = ({ data }) => {
  return (
    <div>
      <div className="flex flex-col overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 sm:flex-row">
        {/*  <!-- Image --> */}
        <figure className="flex-1">
          <img
            src={data.image}
            alt="card image"
            className="object-cover min-h-full aspect-auto"
          />
        </figure>
        {/*  <!-- Body--> */}
        <div className="flex-1 p-6 sm:mx-6 sm:px-0">
          <header className="flex gap-4 mb-4">
            <a
              href="#"
              className="relative inline-flex items-center justify-center w-12 h-12 text-white rounded-full"
            >
              <img
                src={data.image}
                alt="user name"
                title="user name"
                width="48"
                height="48"
                className="max-w-full rounded-full"
              />
            </a>
            <div>
              <h3 className="text-xl font-medium text-slate-700">
                {data.name}
              </h3>
              <p className="text-sm text-slate-400"> By Sue, jun 3 2023</p>
            </div>
          </header>
          <p>{data.details}</p>
          <div className="mt-5 flex gap-2">
            {data.trainers.map((trainer) => (
              <Link
              to={`/trainer/${trainer._id}`}
                key={trainer._id}
                class="relative inline-flex items-center justify-center w-10 h-10 text-lg text-white rounded-full"
              >
                
                <img src={trainer.image} className="w-full rounded-[50%] bg-center bg-cover" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
