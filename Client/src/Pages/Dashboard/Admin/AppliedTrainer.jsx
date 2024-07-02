import { useTheme } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAppliedTrainers from "../../../Hooks/useAppliedTrainers";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AppliedTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const [appliedTrainers, refetch] = useAppliedTrainers();
  const { register, handleSubmit } = useForm();
  const [feedback, setFeedback] = useState([]);
  const handleTextArea = (e) => {
    setFeedback(e.target.value);
  };
  const handleRejection = (user) => {
    const rejection = {
      admin_feedback: feedback,
    };
    axiosSecure
      .patch(`/reject-trainer/${user.email}`, rejection)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Rejection Successfull");
          refetch();
        }
      });
  };

  const handleConfirm = (trainer) => {
    const trainerDetails = {
      name: trainer.name,
      email: trainer.email,
      experience: trainer.experience,
      bio: trainer.bio,
      specialization: trainer.specialization,
      certifications: trainer.certifications,
      image: trainer.image,
      availableSlots: trainer.availableSlots,
    };
    axiosSecure.patch("/make-trainer", trainerDetails).then((res) => {
      if (res.data[0].insertedId && (res.data[1].modifiedCount > 0)) {
        Swal.fire("Confirmed Trainer");
      }
      refetch();
    });
  };
  const [isShowing, setIsShowing] = useState(false);

  const wrapperRef = useRef(null);

  useTheme();

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowing(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    let html = document.querySelector("html");

    if (html) {
      if (isShowing && html) {
        html.style.overflowY = "hidden";

        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const modal = document.querySelector("#modal"); // select the modal by it's id

        const firstFocusableElement =
          modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal

        const focusableContent = modal.querySelectorAll(focusableElements);

        const lastFocusableElement =
          focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        document.addEventListener("keydown", function (e) {
          if (e.keyCode === 27) {
            setIsShowing(false);
          }

          let isTabPressed = e.key === "Tab" || e.keyCode === 9;

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus(); // add focus for the last focusable element
              e.preventDefault();
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              firstFocusableElement.focus(); // add focus for the first focusable element
              e.preventDefault();
            }
          }
        });

        firstFocusableElement.focus();
      } else {
        html.style.overflowY = "visible";
      }
    }
  }, [isShowing]);
  return (
    <div>
      <h1 className="text-2xl">
        List of Applied Trainers: {appliedTrainers.length}
      </h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th className="text-left">Profile</th>
                <th>Details</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {appliedTrainers.map((trainer, idx) => (
                <tr className="text-center" key={trainer._id}>
                  {isShowing && typeof document !== "undefined"
                    ? ReactDOM.createPortal(
                        <div
                          className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
                          aria-labelledby="header-1a content-1a"
                          aria-modal="true"
                          tabIndex="-1"
                          role="dialog"
                        >
                          {/*    <!-- Modal --> */}
                          <div
                            className="flex max-h-[90vh] w-11/12 max-w-2xl flex-col gap-6 overflow-hidden rounded-2xl bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                            ref={wrapperRef}
                            id="modal"
                            role="document"
                          >
                            {/*        <!-- Modal header --> */}
                            <header
                              id="header-1a"
                              className="flex items-center gap-4"
                            >
                              <h3 className="flex-1 text-xl font-medium text-slate-700">
                                {trainer.name} - has applied.
                              </h3>
                              <button
                                onClick={() => setIsShowing(false)}
                                className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide  text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                                aria-label="close dialog"
                              >
                                <span className="relative only:-mx-5">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    role="graphics-symbol"
                                    aria-labelledby="title-79 desc-79"
                                  >
                                    <title id="title-79">Icon title</title>
                                    <desc id="desc-79">
                                      A more detailed description of the icon
                                    </desc>
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </span>
                              </button>
                            </header>
                            {/*        <!-- Modal body --> */}
                            <div
                              id="content-1a"
                              className="flex-1 overflow-auto"
                            >
                              <div>
                                <p>Specialization: {trainer.specialization}</p>
                                <p>Bio: {trainer.bio}</p>
                                <p>Experience: {trainer.experience}yrs</p>
                              </div>
                            </div>
                            {/*        <!-- Modal actions --> */}
                            <div className="flex justify-start gap-2">
                              <button
                                onClick={() => handleConfirm(trainer)}
                                className="btn btn-outline btn-success"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() =>
                                  document
                                    .getElementById("my_modal_1")
                                    .showModal()
                                }
                                className="btn btn-outline btn-error"
                              >
                                Reject
                              </button>
                              {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
                            </div>
                            <dialog id="my_modal_1" className="modal">
                              <div className="modal-box">
                                <h3 className="flex-1 text-xl font-medium text-slate-700">
                                  Why you want to reject {trainer.name}?
                                </h3>
                                <p className="py-4">
                                  <form>
                                    <label className="form-control">
                                      <div className="label">
                                        <span className="label-text">
                                          Write the reason
                                        </span>
                                      </div>

                                      <textarea
                                        onChange={handleTextArea}
                                        className="textarea textarea-bordered h-24"
                                        placeholder="here...."
                                      ></textarea>
                                    </label>
                                  </form>
                                </p>
                                <div className="modal-action">
                                  <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    {/* <button className="btn btn-outline btn-error">Confirm Reject</button> */}
                                    <button
                                      className="btn btn-error"
                                      onClick={() => {
                                        setIsShowing(false);
                                        handleRejection(trainer);
                                      }}
                                    >
                                      Confirm Reject
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </dialog>
                          </div>
                        </div>,
                        document.body
                      )
                    : null}
                  <th>{idx + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={trainer.image}
                            alt={`${trainer.name} image`}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{trainer.name}</div>
                        <div className="text-sm opacity-50">
                          {trainer.experience}yrs
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => setIsShowing(true)}
                      className="btn btn-outline"
                    >
                      <span>View</span>
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppliedTrainer;
