import React, { useState } from "react";

export const Input = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validatePassword = (value) => {
    const lengthValid = value.length >= 8 && value.length <= 16;
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[*!@#\$%\^&\(\)_\+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);

    return lengthValid && hasNumber && hasSpecial && hasLower && hasUpper;
  };

  const handleInput = (e) => {
    setIsValid(validatePassword(e.target.value));
    if (props.onChange) props.onChange(e); // Pass value up to parent
  };

  return (
    <div className="relative flex flex-col gap-[16px]">
      <label
        htmlFor="infield"
        className="text-[20px] font-['Montserrat'] font-semibold text-white"
      >
        {props.label}
      </label>

      <input
        className="bg-[#D9D9D91A] text-white pl-[10px] font-['Montserrat'] w-[426px] h-[65px] rounded-[13px] outline-none"
        id="infield"
        type={props.type}
        value={props.value}
        onFocus={() => props.type === "password" && setShowPopup(true)}
        onBlur={() => props.type === "password" && setShowPopup(false)}
        onInput={props.type === "password" ? handleInput : props.onChange}
        onChange={props.onchange}
        autoComplete={props.auto}
      />

      {/* Password popup */}
      {props.type === "password" && showPopup && (
        <div
          className={`absolute top-[105px] left-0 w-[426px] rounded-[10px] p-3 text-sm font-['Montserrat'] ${
            isValid
              ? "text-green-400 border border-green-400"
              : "text-red-400 border border-red-400"
          } bg-[#1E1E1E]`}
        >
          {isValid
            ? "✔ Strong Password"
            : "✖ Must be 8-16 characters, include a number, a special character, a lowercase and an uppercase letter."}
        </div>
      )}
    </div>
  );
};
