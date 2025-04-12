import { Badges } from "./components/Badges";
import { Input } from "./components/Input";
import google from "./assets/googleLogin.png";
import facebook from "./assets/faceBook.png";
import twitter from "./assets/twitterLogin.png";
import logo from "./assets/logo.svg";
import { Header } from "./components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth/web-extension";
import { auth,db } from "./components/Firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth,email,password)
      const user = auth.currentUser;
      if(user){
        await setDoc(doc(db,"Users",user.uid),{
          email: user.email,
          username: username
        })
        toast.success("Registered Succesfully!",{
          position: "top-center"
        })
      }
      navigate("/login");
    } catch (err) {
      console.error(err.message);
      toast.error(err.message,{
        position: "bottom-center"
      })
      setError(err.message);
    }
  };
  return (
    <>
      <section className="back flex justify-center items-center relative overscroll-none">
        <Header logo={logo} />
        <div className="flex mt-[60px] flex-col justify-center items-center gap-[22px] w-[556px] h-[888px] rounded-[50px] bg-[#232530] ">
          <h1 className="text-[64px] relative top-[-42px] text-white font-bold text-center">
            SignUp
          </h1>
          <Input label="Username" type="text" value={username} onchange={(e)=> setUser(e.target.value)} />
          <Input label="Email" auto="off" type="email" value={email} onchange={(e)=> setEmail(e.target.value)} />
          <Input label="Password" auto='off' type="password" value={password} onchange={(e)=> setPass(e.target.value)} />
          {error && <p className="text-red-500">{error}</p>}
          <button onClick={handleSignup} className="bg-[#07D4DFBF] hover:bg-[#07D4DF] mt-[10px] cursor-pointer font-['Montserrat'] text-center text-[20px] font-bold text-white w-[426px] h-[65px] rounded-[13px]">
            Submit
          </button>
          <p className="text-[20px] font-bold text-white">or</p>
          <div className="flex gap-[29px]">
            <Badges image={google} />
            <Badges image={facebook} />
            <Badges image={twitter} />
          </div>
          <div className="flex gap-[5px]  justify-center items-center">
            <p className="text-[12px] font-semibold text-white">
              Already Registered?
            </p>
            <a
              href=""
              onClick={() => navigate("/login")}
              className="text-[#56C4FB] underline font-semibold text-[12px] hover:no-underline"
            >
              Login
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
