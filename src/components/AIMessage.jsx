import React from "react";
import logo from "../assets/logo.svg";
import ReactMarkdown from 'react-markdown'

export const AIMessage = ({ output, isLoading }) => {
  return (
    <div className="flex flex-col items-start gap-[10px] mt-[20px] animate-fade-in">
      <div>
        <img
          src={logo}
          alt="logo"
          className="w-[29px] h-[29px] rounded-b-[29px] rounded-tr-[29px]"
        />
      </div>
      <div className="bg-[#424B57] inline-block max-w-[800px] pt-[25px] pb-[25px] pl-[15px] pr-[15px] rounded-b-[13px] rounded-tr-[13px] text-white font-semibold text-[16px] min-h-[60px]">
        {isLoading ? (
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-300" />
          </div>
        ) : (
          <ReactMarkdown>
            {output}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};
