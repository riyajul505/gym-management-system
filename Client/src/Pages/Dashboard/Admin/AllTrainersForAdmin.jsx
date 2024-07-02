import React from "react";
import useTrainersData from "../../../Hooks/useTrainersData";
import { FiDelete } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllTrainersForAdmin = () => {
  const [trainers,isLoading, refetch] = useTrainersData();
  const axiosSecure = useAxiosSecure();
  const handleTrainerDelete = (trainerEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete trainer!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-trainer/${trainerEmail}`).then((res) => {
          if (res.data[0].deletedCount > 0 && res.data[1].modifiedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your is done.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div>
      <h1 className="text-xl">All Subscribers</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-lg">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Specializaion</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer, idx) => (
                <tr key={trainer._idx} className="bg-base-200">
                  <th>{idx + 1}</th>
                  <td>{trainer.name}</td>
                  <td>{trainer.specialization}</td>
                  <td>
                    <button
                      onClick={() => handleTrainerDelete(trainer.email)}
                      className="btn btn-outline"
                    >
                      <MdDelete />
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

export default AllTrainersForAdmin;
