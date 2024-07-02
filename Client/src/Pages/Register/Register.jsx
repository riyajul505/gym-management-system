import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, updateInfo, setLoading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((res) => {
        updateInfo(data.name, data.photourl)
          .then(async() => {
            setLoading(false);
            const userData = {
              name: data.name,
              email: data.email,
              role: "member",
              trainer_applied: false,
              admin_feedback: false,
            };

            const res = await  axiosPublic.post("/add-new-users", userData);
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registred Successfull",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            navigate('/')
          })
          .catch(() => {setLoading(false)});
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div>
      <Helmet>
        <title>Register | FitScheduler</title>
    </Helmet>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col pt-1">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body p-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  {...register("photourl")}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                {errors.password && (
                  <span className="text-red-300">
                    password must have one upper and lower case and numbers
                  </span>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary"
                />
              </div>
            </form>
            <Link to={"/login"} className="text-center mx-5">
              Already have an Acoount? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
