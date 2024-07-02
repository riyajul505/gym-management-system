import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { login, googleLogin, setLoading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    login(data.email, data.password)
      .then(async (data) => {
        const userData = {
          name: data.user.displayName,
          email: data.user.email,
          role: "member",
          trainer_applied: false,
          admin_feedback: false,
        };
        navigate('/')
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged In",
          showConfirmButton: false,
          timer: 1500,
        });

        const res = await axiosPublic.post("/add-new-users", userData);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registred Successfull",
            showConfirmButton: false,
            timer: 1500,
          });
          
        } else {
          console.log(res.data);
        }
      })
      .catch((error)=>{setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleGoogle = () => {
    googleLogin()
      .then(async (data) => {
        const userData = {
          name: data.user.displayName,
          email: data.user.email,
          role: "member",
          trainer_applied: false,
          admin_feedback: false,
        };
        navigate('/')

        const res = await axiosPublic.post("/add-new-users", userData);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registred Successfull",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.log(res.data);
        }
      })
      .catch(() => setLoading(false));
  };

  return (
    <>
    <Helmet>
        <title>Login | FitScheduler</title>
    </Helmet>
    <div className="w-full flex flex-col justify-center items-center mt-3">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800 bg-white">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Login to your account
        </h2>
        <p className="text-sm text-center dark:text-gray-600">
          Dont have account?
          <a
            href="#"
            rel="noopener noreferrer"
            className="focus:underline hover:underline"
          >
            Sign up here
          </a>
        </p>
        <div className="my-6 space-y-4">
          <button
            onClick={handleGoogle}
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
          >
            <FcGoogle className="text-2xl" />
            <p>Login with Google</p>
          </button>

          <button
            aria-label="Login with Twitter"
            role="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
          >
            <FaTwitter className="text-2xl text-[#1DA1F2]" />
            <p>Login with Twitter</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-600" />
          <p className="px-3 dark:text-gray-600">OR</p>
          <hr className="w-full dark:text-gray-600" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                {...register("email")}
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-600"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                {...register("password")}
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
          </div>
          <input
            type="submit"
            value="Login"
            className="w-full btn text-text px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
          />
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
