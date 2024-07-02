import React from "react";
import { CgGym } from "react-icons/cg";
import { GiProgression } from "react-icons/gi";
import { MdForum } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";

const FeatureSection = () => {
  return (
    <div>
      <section className="m-4 md:m-8 dark:bg-gray-100 dark:text-gray-800">
        <div className="container mx-auto p-4 my-6 space-y-2 text-center">
          <h2 className="text-5xl font-bold">Built to empower YOU</h2>
          <p className="dark:text-gray-600">Join us to be fit.</p>
        </div>
        <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-4">
          <CgGym className="text-4xl" />
            <h3 className="my-3 text-3xl font-semibold text-center">Expert Trainers</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>Connect with certified trainers to</p>
              <p>get personalized fitness plans</p>
              <p>and professional guidance</p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
          <GiProgression className="text-4xl" />
            <h3 className="my-3 text-3xl font-semibold text-center">Track Your Progress</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>Monitor your fitness journey</p>
              <p>with detailed progress</p>
              <p>tracking and analytics</p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
          <SiGoogleclassroom className="text-4xl" />
            <h3 className="my-3 text-3xl font-semibold">Join Classes</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>Access a variety of fitness</p>
              <p>classes tailored to all</p>
              <p>levels and interests</p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
          <MdForum className="text-4xl" />
            <h3 className="my-3 text-3xl font-semibold text-center">Community Support</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>Be part of a supportive community</p>
              <p>that motivates and inspires</p>
              <p>you to stay on track.</p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
          <RiCalendarScheduleLine className="text-4xl" />
            <h3 className="my-3 text-3xl font-semibold text-center">Flexible Scheduling</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>Easily book and</p>
              <p>manage your</p>
              <p>training sessions</p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8 dark:text-violet-600"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h3 className="my-3 text-3xl font-semibold text-center">Nutrition Guidance</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>Get expert advice</p>
              <p>on diet</p>
              <p>and nutrition</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureSection;
