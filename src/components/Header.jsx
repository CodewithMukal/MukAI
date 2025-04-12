import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = (props) => {
    const nav = useNavigate();
  return (
    <div className="absolute top-0 left-0 flex justify-between p-[13px]  pl-[110px] items-center w-[100vw]">
      <div onClick={()=> nav('/')} className="flex cursor-pointer justify-center pl-[10px] items-center gap-[13px]">
        <img src={props.logo} alt="" />
        <p className="text-[64px] sel font-bold text-white font-['Montserrat']">
          MukAI
        </p>
      </div>
      <div>
        <a
            onClick={()=>nav('/login')}
          className="text-white font-[Montserrat] font-bold text-[26px] underline pr-[124px] hover:no-underline"
          href=""
        >
          Login
        </a>
      </div>
    </div>
  );
};
