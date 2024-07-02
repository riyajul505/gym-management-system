import React, { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const UserActivity = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  console.log(userInfo, 'foo');

  useEffect(() => {
    axiosPublic
      .get(`/get-user-info/${user.email}`)
      .then((res) => setUserInfo(res.data));
  }, [axiosPublic, user.email]);
  return (
    <div>
      {
        userInfo.trainer_applied && <div>Be a trainer status pending</div>
      }
      {
        userInfo.admin_feedback && <>
                
        Show FeedBack
        <button
          className="btn"
          onClick={() =>
            document.getElementById("my_modal_2").showModal()
          }
        >
          
          <FaEye />
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Reason for not selecting.</h3>
            <p className="py-4">
              {userInfo?.admin_feedback}
            </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
      }
      {
        userInfo.trainer_applied == userInfo.admin_feedback && <p>You do not have any recent activity</p>
      }
    </div>
  );
};

export default UserActivity;
