import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase"; // make sure path is correct

export const Header2 = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsub();
  }, []);

  return (
    <div className="absolute top-0 left-0 flex justify-between p-[13px] pl-[110px] items-center w-[100vw]">
      <div
        onClick={() => navigate("/")}
        className="flex justify-center pl-[10px] items-center gap-[13px] cursor-pointer"
      >
        <img src={props.logo} alt="" />
        <p className="text-[64px] sel font-bold text-white font-['Montserrat']">
          MukAI
        </p>
      </div>
      <div className="flex">
        {isLoggedIn ? (
          <a
            onClick={() => navigate("/home")}
            className="text-white font-[Montserrat] font-bold text-[26px] underline pr-[39px] hover:no-underline cursor-pointer"
          >
            Home
          </a>
        ) : (
          <>
            <a
              onClick={() => navigate("/login")}
              className="text-white font-[Montserrat] font-bold text-[26px] underline pr-[39px] hover:no-underline cursor-pointer"
            >
              Login
            </a>
            <a
              onClick={() => navigate("/signup")}
              className="text-white font-[Montserrat] font-bold text-[26px] underline pr-[39px] hover:no-underline cursor-pointer"
            >
              Signup
            </a>
          </>
        )}
        <a
          className="text-white font-[Montserrat] font-bold text-[26px] underline pr-[124px] hover:no-underline"
          href="https://www.instagram.com/ordinary_mukal"
          target="_blank"
          rel="noopener noreferrer"
        >
          About
        </a>
      </div>
    </div>
  );
};
