import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useTrainersData from "../../Hooks/useTrainersData";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AddNewClass = () => {
    const axiosSecure = useAxiosSecure();
    const animatedComponents = makeAnimated();
    const [allTrainers] = useTrainersData();
    const [seletedTrainer, setSelectedTrainer] = useState([]);
    const handleSelectTrainer = (trainers) =>{
        setSelectedTrainer({...seletedTrainer, trainers})
    };
    // making options for selecting trainers in the form 
    const options = allTrainers.map(trainer => ({
        value: trainer._id,
        label: `${trainer.name} '${trainer.specialization}'`
    }));
    const trainers = seletedTrainer?.trainers?.map(i => i.value);
    const { register, handleSubmit, reset} = useForm();
      const onSubmit = (data) => {
        const addClass = {
            ...data, trainers, totalBookings: 0
        };
        axiosSecure.post('/add-new-class', addClass)
        .then( res => {if(res.data.insertedId){
            Swal.fire('Class Added');
            reset();
        }})
      }  
  return (
    <div className="space-y-3">
      <h1 className="text-xl">Add New Class</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="input input-bordered flex items-center gap-2">
          Class Name
          <input {...register('name')} type="text" className="grow" placeholder="write here..." />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Image URL
          <input {...register('image')} type="text" className="grow" placeholder="write here..." />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          More about the class
          <input {...register('details')} type="text" className="grow" placeholder="write here..." />
        </label>
        <Select
          onChange={handleSelectTrainer}
          closeMenuOnSelect={false}
          components={animatedComponents}
          
          isMulti
          options={options}
          placeholder="select your trainers"
        />
        <input className="btn btn-primary" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddNewClass;
