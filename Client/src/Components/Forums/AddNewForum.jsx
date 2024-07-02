import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCheckRole from "../../Hooks/useCheckRole";

const AddNewForum = () => {
    const axiosSecure = useAxiosSecure();
    const [adminRole] = useCheckRole();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const post ={
        title: data.title,
        content: data.content,
        votes: {
            upVotes: 0,
            downVotes: 0,
        },
        who_posted: adminRole
    };
    axiosSecure.post('/add-new-forum', post)
    .then(res => {
        if(res.data.insertedId){
            Swal.fire('Forum Post Added');
            reset();
        }
    })
  };
  return (
    <div className="space-y-2">
        <h1 className="text-2xl">Add a forum post here...</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            {...register("title")}
            type="text"
            placeholder="title"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <textarea
            {...register("content")}
            placeholder="description"
            className="textarea textarea-bordered textarea-lg w-full max-w-xs"
          ></textarea>
        </div>
        <input
          type="submit"
          value="Post"
          className="btn btn-outline btn-success"
        />
      </form>
    </div>
  );
};

export default AddNewForum;
