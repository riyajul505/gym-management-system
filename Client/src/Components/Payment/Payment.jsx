import React, { useContext } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Payment = () => {
  const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const trainer = useLoaderData();
  const location = useLocation();
  const { slot, packageName, price, } = location.state || {};
  const handlePayment = () => {
    const bookingDetails = {
        userEmail: user.email,
        day:slot.day,
        time: slot.time,
        packageName,
        className: slot.className,
        price: parseInt(price),
        trainer_email: trainer.email,
        trainerId: trainer._id,
      };
      axiosPublic.post('/bookSlot',bookingDetails)
      .then(res => {console.log(res.data, 'boooked or not?');
        if(res.data == 'Slot booked successfully'){
          Swal.fire('Payment successfull');
          navigate('/dashboard/booked-slot');
        }
      })
  };
  return (
    <div>
      <h1 className="text-2xl">Payment Page</h1>
      <p>Trainer: {trainer.name}</p>
      <p>
        Slot: {slot.day} {slot.time}
      </p>
      <p>Class: {slot.className}</p>
      <p>package: {packageName}</p>
      <p>Price: {price}</p>
      <button onClick={handlePayment} className="btn btn-primary">
        Confirm
      </button>
    </div>
  );
};

export default Payment;
