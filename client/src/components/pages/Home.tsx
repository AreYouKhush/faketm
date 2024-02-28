import React from "react";
import { TypewriterEffect } from "../ui/TypewriterEffect";
import { NavLink } from "react-router-dom";
import { MovingBorderButton } from "../ui/MovingBorder";
import { useRecoilState } from "recoil";
import { loginState } from "@/state/atoms/LoginState";

const Home = () => {

  const [login, setLogin] = useRecoilState(loginState);

  return (
    <>
      <main className="">
        <div className="dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-slate-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="flex flex-col items-center gap-8 justify-center h-[43rem]">
            <div className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 p-6">
              Zest
            </div>
            <div>
              <TypewriterEffect
                words={[
                  { text: "feel" },
                  { text: "easy" },
                  { text: "with" },
                  {
                    text: "money.",
                    className: "text-green-900 dark:text-green-600",
                  },
                ]}
              ></TypewriterEffect>
            </div>
            <div>
              {!login ? (
              <NavLink to="register">
                <MovingBorderButton
                  borderRadius="1.75rem"
                  className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 font-bold dark:hover:bg-slate-950 hover:bg-gray-100 duration-100"
                >
                  Sign up Now!
                </MovingBorderButton>
              </NavLink>
              ) : (
                <NavLink to="dashboard">
                <MovingBorderButton
                  borderRadius="1.75rem"
                  className="bg-white text-base dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 font-bold dark:hover:bg-slate-950 hover:bg-gray-100 duration-100"
                >
                  DashBoard
                </MovingBorderButton>
              </NavLink>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
