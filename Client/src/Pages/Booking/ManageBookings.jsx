import React, { useContext } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useLoadTrainer from "../../Hooks/useLoadTrainer";
import { Helmet } from "react-helmet-async";

const ManageBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [trainer, isLoading, refetch] = useLoadTrainer();
  if (isLoading) {
    return "waittt";
  }
  const handleShowModal = (email) => {
    axiosPublic
      .get(`/get-user-info/${email}`)
      .then((res) => Swal.fire(`Name: ${res.data.name}`));
  };
  const handleDeleteSlot = (slot) => {
    axiosPublic.patch(`/delete-slot/${user.email}`, slot).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Slot Deleted");
        refetch();
      }
    });
  };
  return (
    <>
    <Helmet>
        <title>Manage Bookings</title>
    </Helmet>
    <div>
      <h1 className="text-xl"></h1>
      <div>
        <div className="container p-2 mx-auto sm:p-4 text-gray-800">
          <h2 className="mb-4 text-2xl font-semibold leading-tight">
            Manage bookings
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              {/* <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col className="w-24" />
              </colgroup> */}
              <thead className="bg-gray-300">
                <tr className="text-center">
                  <th className="p-3">Day</th>
                  <th className="p-3">time</th>
                  <th className="p-3">Booked</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">See Who</th>
                </tr>
              </thead>
              <tbody>
                {trainer.availableSlots.map((slot, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-opacity-20 border-gray-300 bg-gray-50 text-center"
                  >
                    <td className="p-3">
                      <p>{slot.day}</p>
                    </td>
                    <td className="p-3">
                      <p>{slot.time}</p>
                    </td>
                    <td className="p-3">
                      <p>{slot.isBooked ? <p>Yes</p> : <p>No</p>}</p>
                    </td>
                    <td className="p-3">
                      {slot.isBooked ? (
                        <button disabled className="btn">
                          <MdDeleteOutline />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDeleteSlot(slot)}
                          className="btn"
                        >
                          <MdDeleteOutline />
                        </button>
                      )}
                    </td>

                    <td className="p-3 text-center">
                      <span>
                        {slot.isBooked ? (
                          <button
                            onClick={() => handleShowModal(slot.bookedBy)}
                            className="px-3 py-1 font-semibold rounded-md bg-violet-600 text-white btn"
                          >
                            view
                          </button>
                        ) : (
                          <button
                            className="px-3 py-1 font-semibold rounded-md bg-violet-600 text-white btn"
                            disabled
                          >
                            View
                          </button>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ManageBookings;
