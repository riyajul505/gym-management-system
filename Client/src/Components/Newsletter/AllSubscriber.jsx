import React from "react";
import { useLoaderData } from "react-router-dom";

const AllSubscriber = () => {
  const subscribers = useLoaderData();
  console.log(subscribers);
  return (
    <div>
      <h1 className="text-xl">All Subscribers</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((letter, idx) => (
                <tr key={letter._idx} className="bg-base-200">
                  <th>{idx + 1}</th>
                  <td>{letter.email}</td>
                  <td>
                    <button disabled className="btn btn-outline">
                      Send Email
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSubscriber;
