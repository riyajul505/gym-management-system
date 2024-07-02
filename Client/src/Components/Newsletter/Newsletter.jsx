import { Input, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Newsletter = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    axiosPublic.post('/insert-newsletter-email', data)
    .then(res =>{
      if(res.data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Newsletter Subscribed",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
      
    })
    
  };
  return (
    <section className="py-20 mx-auto container max-w-4xl px-8">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 !items-center">
        <Typography className="text-gray-500 !font-semibold">
          Stay in the Know: Subscribe for Exclusive Updates
        </Typography>
        <div className="flex items-start flex-col gap-4 md:flex-row">
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <Input {...register("email")} label="Enter your email" />
            <input
              className="btn flex-shrink-0 md:w-fit w-full"
              type="submit"
              value="subscribe"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
