import React, { useState } from "react";
import { Header3 } from "./components/Header3";
import logo from "./assets/logo.svg";
import { Input } from "./components/Input";
import { Badges } from "./components/Badges";
import google from "./assets/googleLogin.png";
import facebook from "./assets/faceBook.png";
import twitter from "./assets/twitterLogin.png";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./components/Firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./components/Firebase";

const googleProvider = new GoogleAuthProvider();

export const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("")
  const [password,setPass] = useState("")

  const handleLogin = async (e)=>{
    try{
      await signInWithEmailAndPassword(auth,email,password)
      toast.success("Logged In ✔")
      navigate('/home')
    }
    catch(err){
      toast.error(err.message)
    }
  }
  const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            username: user.displayName || "Google User",
          });
          toast.success("Logged in with Google!", {
            position: "top-center",
          });
        }
        navigate("/Home");
      } catch (err) {
        console.error(err.message);
        toast.error(err.message, {
          position: "bottom-center",
        });
        setError(err.message);
      }
    };
  return (
    <section className='back flex justify-center items-center relative font-["Montserrat"]'>
      <Header3 logo={logo} />
      <div className="flex  justify-center items-center flex-col gap-7 w-[556px] h-[888px] rounded-[50px] bg-[#232530] mt-[80px]">
        <h1 className="text-[64px] relative top-[-42px] text-white font-bold text-center">
          Login
        </h1>
        <div className="flex flex-col gap-11">
          <Input type={"email"} auto='off' label={"Email"} value={email} onchange={(e)=> setEmail(e.target.value)}  />
          <Input type={"password"} auto='off' label={"Password"} value={password} onchange={(e)=> setPass(e.target.value)} />
        </div>
        <div className="flex justify-center items-center gap-[193px]  mt-[20px]">
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              className="w-[16px] h-[16px] flex-shrink-0 aspect-square rounded-[2px] border border-white bg-[rgba(217,217,217,0.05)] flex items-center justify-center cursor-pointer peer-checked:bg-white peer-checked:text-black"
            />
            <p className="font-semibold text-white text-[12px]">Remember Me</p>
          </div>
          <p className="font-semibold text-[12px] text-[#56C4FB] underline hover:no-underline cursor-pointer">
            Forgot Password?
          </p>
        </div>
        <button onClick={handleLogin} className="bg-[#07D4DFBF] hover:bg-[#07D4DF] mt-[10px] cursor-pointer font-['Montserrat'] text-center text-[20px] font-bold text-white w-[426px] h-[65px] rounded-[13px]">
          Submit
        </button>
        <p className="font-bold text-white text-[20px]">or</p>
        <div className="flex gap-[29px]">
          <Badges onClick={handleGoogleLogin} image={google} />
          <Badges image={facebook} />
          <Badges image={twitter} />
        </div>
        <div className="flex gap-[5px]  justify-center items-center">
          <p className="text-[12px] font-semibold text-white">
            Haven't Registered?
          </p>
          <a
            href=""
            onClick={() => navigate("/signup")}
            className="text-[#56C4FB] underline font-semibold text-[12px] hover:no-underline"
          >
            Sign Up
          </a>
        </div>
      </div>
    </section>
  );
};
