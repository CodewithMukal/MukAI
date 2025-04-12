import React, { useEffect, useState } from "react";
import { Header2 } from "./components/Header2";
import logo from "./assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { auth } from "./components/Firebase";

const AI = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="back h-[100vh] flex justify-center items-center relative">
      <Header2 logo={logo} />
      <div className="flex justify-center items-center flex-col gap-[64px] text-white">
        <h1 className="font-bold text-[84px] animate-fade-down">
          The AI of the future
        </h1>
        <p className="text-[26px] text-center w-[1000px] animate-fade-down animate-delay-300">
          Whether you need quick answers, creative ideas, help with tasks, or
          just someone to talk to, I'm always ready. Think of me as your
          friendly, intelligent companion who’s available 24/7. Let’s get
          started!
        </p>
        <div className="flex mt-[73px] gap-[13px] ">
          <button
            onClick={() => navigate(isLoggedIn ? "/home" : "/signup")}
            className="bg-[#07D4DF] animate-fade-right animate-delay-800 hover:bg-[#07D4DFBF] w-[364px] h-[65px] text-[32px] font-bold rounded-[32.5px]"
          >
            Get Started
          </button>
          <button className="border-2 animate-fade-left animate-delay-800 hover:bg-[#41414145] w-[364px] h-[65px] text-[32px] font-bold rounded-[32.5px]">
            About Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default AI;
