import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AddNewSlot = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
        const availableData = {
            day: data.day,
            time: data.time,
            isBooked : false,
            bookedBy: null,
        };
        axiosPublic.patch(`/add-new-slot/${user.email}`, availableData)
        .then(res => {if(res.data.modifiedCount> 0){
            Swal.fire('Slot Added'); reset();
        }})
      }
  return (
    <div>
      <h1 className="text-xl">Add new slot</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="join">
            <div>
              <div>
                <select {...register('day')} className="select select-bordered join-item">
                  <option disabled selected>
                    Day
                  </option>
                  <option>Sat</option>
                  <option>Sun</option>
                  <option>Mon</option>
                  <option>Tues</option>
                  <option>Wed</option>
                  <option>Thr</option>
                  <option>Fri</option>
                </select>
              </div>
            </div>
            <select {...register('time')} className="select select-bordered join-item">
              <option disabled selected>
                Time
              </option>
              <option>6:00</option>
              <option>7:00</option>
              <option>8:00</option>
              <option>9:00</option>
              <option>10:00</option>
              <option>18:00</option>
              <option>19:00</option>
            </select>
            <div className="indicator">
              <span className="indicator-item badge badge-secondary">new</span>
              <input type="submit" value="Add" className="btn join-item" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewSlot;
