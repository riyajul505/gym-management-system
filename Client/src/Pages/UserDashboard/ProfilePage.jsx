import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axiosPublic
      .patch("/update-user", {
        name: data.name,
        url: data.url,
        email: user?.email,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated");
        }
        else{
            Swal.fire('error, not updated')
        }
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Update Profile Now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  {...register("url")}
                  type="text"
                  placeholder="url"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Last Login Time
                  </a>
                  <h1 className="text-xs">{user.metadata.lastSignInTime}</h1>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
