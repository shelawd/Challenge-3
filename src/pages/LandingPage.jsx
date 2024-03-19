import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-[#dff5ff] h-screen">
      <div>
        <div className="flex flex-row ">
          <div className="flex flex-col justify-center ms-28">
            <p className="text-4xl font-bold whitespace-nowrap text-[#333A73]">
              Record Your{" "}
            </p>
            <p className="text-4xl font-bold whitespace-nowrap text-[#0C359E]">
              Dream Travel List
            </p>

            <Link
              to="/travel-app"
              className="bg-[#EE4266] hover:bg-[#A0153E] text-white font-bold py-2 px-4 w-40 rounded mt-4 text-center"
            >
              Get Started
            </Link>
          </div>
          <div className="flex justify-center items-center lg:w-1/2 ms-48 mt-28">
            <img
              className=" w-full lg:w-4/5 ms "
              src="/src/assets/component/Group 1.png"
              alt="Ikon landing page"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
