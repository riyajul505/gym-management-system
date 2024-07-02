import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const BookedClass = () => {
  const [bookedSlot, setBookedSlot] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic
      .get(`/booked-slot/${user?.email}`)
      .then((res) => setBookedSlot(res.data));
  }, [axiosPublic, user?.email]);
  return (
    <>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Trainer Name</th>
                <th>Day</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {bookedSlot.map((slot, idx) => (
                <tr key={idx} className="bg-base-200">
                  <th>{idx+1}</th>
                  <td>{slot.trainerName}</td>
                  <td>{slot.day}</td>
                  <td>{slot.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookedClass;
