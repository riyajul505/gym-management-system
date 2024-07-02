import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const BeATrainer = () => {
  const animatedComponents = makeAnimated();
  const axiosPublic = useAxiosPublic();
  const [days, setDays] = useState([]);
  const [time, setTime] = useState([]);
  const options = [
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
  ];
  const options2 = [
    { value: "08:00", label: "08:00" },
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "16:00", label: "16:00" },
    { value: "17:00", label: "17:00" },
    { value: "18:00", label: "18:00" },
  ];
  const createAvailableSlots = (times, days) => {
    const availableSlots = [];

    days.forEach(day => {
        times.forEach(time => {
            availableSlots.push({
                day: day.value,
                time: time.value,
                isBooked: false,
                bookedBy: null
            });
        });
    });

    return availableSlots;
};

const availableSlots = createAvailableSlots(time, days);
  const { user } = useContext(AuthContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const apply = {
        photourl: user.photoURL,
        experience : data.experience,
        specialization: data.specialization,
        availableSlots,
        bio: data.bio,
    };
    axiosPublic.patch(`/be-a-trainer/${user.email}`,apply)
    .then(res => {if(res.data.modifiedCount){
        Swal.fire('Application successful');
        reset();
    }})
  };

  const handleDaysChange = (selectedOptions) => {
    setDays(selectedOptions);
    
  };

  const handleTimeChange = (selectedOptions) => {
    setTime(selectedOptions);
    
  };

  return (
    <>
    <Helmet>
        <title>Be A Trainer</title>
    </Helmet>
    <div>
      <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            defaultValue={user.displayName}
            type="text"
            className="grow"
            placeholder="Daisy"
            readOnly
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            type="email"
            defaultValue={user.email}
            className="grow"
            placeholder="daisy@site.com"
            readOnly
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Photo URL
          <input
            type="text"
            defaultValue={user.photoURL}
            className="grow"
            placeholder="url"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          experience
          <input
            {...register("experience")}
            type="number"
            className="grow"
            placeholder="experience"
          />
        </label>

        <select
          {...register("specialization")}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled selected>
            Specialization
          </option>
          <option>Cardio Blast</option>
          <option>Yoga</option>
          <option>Strength Training</option>
          <option>Pilates</option>
          <option>HIIT</option>
        </select>
       
        <Select
          onChange={handleDaysChange}
          closeMenuOnSelect={false}
          components={animatedComponents}
          
          isMulti
          options={options}
          placeholder="select your days"
        />
        <Select
          onChange={handleTimeChange}
          closeMenuOnSelect={false}
          components={animatedComponents}

          isMulti
          options={options2}
          placeholder="select time"
        />
        <textarea {...register('bio')} placeholder="write more about you"></textarea>
        <input type="submit" value="submit" className="btn" />
      </form>
    </div>
    </>
  );
};

export default BeATrainer;
